import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrentLocationService } from '../../services/current-location.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { Loader } from "@googlemaps/js-api-loader"
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { TypeEventsService } from '../../services/type-events.service';
import { MovilService } from '../../services/movil.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, GoogleMapsModule, FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public latitude : number;
  public longitude: number;
  public markers: any = [];
  public center: google.maps.LatLngLiteral;
  public map: any;
  public position : any;
  public zoom = 12;
  private mapId = "DEMO_MAP_ID";
  private geocoder: google.maps.Geocoder;
  public txtSearch : any;
  public wresult = false;
  public actInfo: any;
  public info = {
    address : '',
    lat : 0,
    lng : 0
  };
  public actModal = false;
  public itemsTipo: any;
  public latLng: any;
  public marker: any;
  public evento = {
    tipo:'',
    lat:0,
    lng:0
  }


  private loader = new Loader({
    apiKey: "AIzaSyCTkR3En4AT1HXqGZ5kgcTbJ24AoxzAd-A",
    version: "weekly",
  });

  txtSelect :any = [];

  

constructor(private locationService: CurrentLocationService, 
            private _eventService: EventsService, 
            private _typeEventService: TypeEventsService,
            private _movilService: MovilService){}
  
async ngOnInit() {
    const position = await this.getLocation();
    await this.initMap(position);
    const arrayMarker = await this._eventService.getEvents();
    this.inyectarMarker(arrayMarker);
    const arrayCars = await this._movilService.getMoviles();
    this.inyectarMarker(arrayCars, 'cars')

    this._eventService.sendPositionMap.subscribe( (data) => {
      this.centrarMapa(data.position)
    });

    google.maps.event.addListener(this.map, 'click', (event:any) => {
      this.itemsTipo = this._typeEventService.getTypesEvents();
      this.actModal = true;
      this.actInfo = false;
      this.latLng = event.latLng.toJSON();

      this.evento.lat = this.latLng.lat;
      this.evento.lng = this.latLng.lng;
   });
  }


  getLocation() {
    return new Promise(async (resolve) => {
       await this.locationService.getPosition().then(pos => {
        let position = { lat: pos.lat, lng: pos.lng}
        resolve( position)
      });
    })
  }

  async initMap(position : any): Promise<void> {
    this.loader.load().then(async () => {
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      this.map = new Map(document.getElementById("map"), {
        center: {lat: Number(position.lat), lng: Number(position.lng)},
        zoom: this.zoom,
        mapId: '34204983242',
        gestureHandling: "cooperative",
      } as google.maps.MapOptions);
    });

    this.evento.lat = Number(position.lat);
    this.evento.lng = Number(position.lng);
    this.evento.tipo = "Mi Ubicación";
    this.saveMarker();
    
     //@ts-ignore
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    this.clickMarker(position);

    //  const marker = new AdvancedMarkerElement({
    //    map: this.map,
    //    position: {lat: Number(position.lat), lng: Number(position.lng)},
    //    title: 'cuchiflo',
    //  });

    //  {
    //   id: 7,
    //   tipo: 'Vehículo detenido',
    //   position: {lat: -32.93421, lng: -71.55674},
    //   fecha: '24/04/2024 15:03',
    //   color: '#FFC300 ',
    //   estado: true
    // }
    //  google.maps.event.addListener(marker, 'click', (event:any) => { 
    //   // console.log(event.latLng.toJSON());
    //   this.getInfoMarker(event)
    // });
  }

  async buscarMarker(position:any){
   
    this.loader.load().then(async () => {
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      this.map = new Map(document.getElementById("map"), {
        center: {lat: Number(position.lat), lng: Number(position.lng)},
        zoom: 12,
        mapId: this.mapId
      } as google.maps.MapOptions);
    });

    this.clickMarker(position);

      // //@ts-ignore
      // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      // const marker = new AdvancedMarkerElement({
      //   map: this.map,
      //   position: {lat: Number(position.lat), lng: Number(position.lng)},
      //   title: 'tito',
      // });

      // google.maps.event.addListener(marker, 'click', (event:any) => { 
      //   this.getInfoMarker(event)
      // });
  }

  async inyectarMarker(data:any, tipo?: any){
    for (let item in data) {
      // @ts-ignore

      await this.clickMarker(data[item].position, tipo);
    //  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    //  const marker = new AdvancedMarkerElement({
    //    map: this.map,
    //    position: {lat: Number(data[item].position.lat), lng: Number(data[item].position.lng)},
    //    title: `${data[item].id}`,
    //  });
      
    //  google.maps.event.addListener(marker, 'click', (event:any) => { 
    //   this.getInfoMarker(event)
    // });

    }
  }

  async clickMarker(position:any, tipo? : any){
      // @ts-ignore
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    const beachFlagImg = document.createElement('img');
    beachFlagImg.src = 'assets/cars.png';
    beachFlagImg.width = 40;

    const alarmIcon = document.createElement('img');
    alarmIcon.src = 'assets/warning.png';
    alarmIcon.width = 40;
    

    let marker : any = new AdvancedMarkerElement();
    if(tipo == 'cars'){
      marker = new AdvancedMarkerElement({
        map: this.map,
        position: position,
        title: 'coquito',
        content: beachFlagImg,
      });
    }else{
      marker = new AdvancedMarkerElement({
        map: this.map,
        position: position,
        title: 'coquito',
        content: alarmIcon,
      });
    }

     google.maps.event.addListener(marker, 'click', (event:any) => { 
      this.getInfoMarker(event)
    });
    
  }

  async centrarMapa(position:any){
    console.log(position)
    this.map.setZoom(18);
    this.map.setCenter({lat: Number(position.lat), lng: Number(position.lng)});
  }
  
  buscar(){
    this.getGeocode(this.txtSearch)
  }

  async getGeocode(request: string) {
    this.locationService.getGeocode(request).subscribe( (data:any) => {
        if(data.status == 'OK'){
          this.txtSelect = data.results;
          console.log(data.results)
        }else{
          this.wresult = true;
        }
    });
  }

  getMarker(position: any, direction: any){
    this.txtSelect = [];
    this.txtSearch = "";
    this.initMap(position);
    this.info = {
      address: direction,
      lat: position.lat,
      lng: position.lng
    }
  }

  revisarTxt(){
    if(this.txtSearch.length <= 0){
      this.wresult = false;
    }
  }

  closeModal(){
    this.actModal = false;
  }

  saveMarker(){
    this.clickMarker(this.latLng);
    this.actModal = false;
    this._eventService.setEvent(this.evento);
  }

  getInfoMarker(marker : any){
    
    let marca = marker.latLng.toJSON();
    this.map.setZoom(16);
    this.map.setCenter({lat: Number(marca.lat), lng: Number(marca.lng)});
    const markSel = this._eventService.searchMarker(marca);

    console.log("markSel",markSel);

    console.log(this._eventService.getEvents)

    if(markSel){
      this.info.address = markSel.tipo;
      this.info.lat = markSel.position.lat;
      this.info.lng = markSel.position.lng;
      this.actInfo = true;
    }
 
  }


}

