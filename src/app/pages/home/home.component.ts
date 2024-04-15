import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrentLocationService } from '../../services/current-location.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { Loader } from "@googlemaps/js-api-loader"
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { TypeEventsService } from '../../services/type-events.service';
import { MovilService } from '../../services/movil.service';
import { Observable } from 'rxjs';
import { TrackeoService } from '../../services/trackeo.service';

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
    lng : 0,
    img : '',
    patente:'',
    data: {}
  };
  public actModal = false;
  public itemsTipo: any;
  public latLng: any;
  public marker: any;
  public evento = {
    tipo:'w',
    title:'',
    lat:0,
    lng:0
  }
  public actCapa = false;
  public capaMovil = true;
  public capaEvent = true;
  public arrayTrack : any = [];
  public clear_auto = true;

  private loader = new Loader({
    apiKey: "AIzaSyCTkR3En4AT1HXqGZ5kgcTbJ24AoxzAd-A",
    version: "weekly",
  });

  txtSelect :any = [];

  position_car = {
    lat: 0,
    lng: 0
  }

  public marker_car: any;

  

constructor(private locationService: CurrentLocationService, 
            private _eventService: EventsService, 
            private _typeEventService: TypeEventsService,
            private _movilService: MovilService,
            private _trackService: TrackeoService){}
  
async ngOnInit() {
    
  const tracker = JSON.stringify(this._trackService.getTrack());
  this.arrayTrack = JSON.parse(tracker)[0];

    const position = await this.getLocation();
    await this.initMap(position);
   
    await this.cargarMarkers()
    
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
        mapTypeId: 'roadmap',
        zoom: this.zoom,
        mapId: '34204983242',
        gestureHandling: "cooperative",
      } as google.maps.MapOptions);
    });

    this.evento.lat = Number(position.lat);
    this.evento.lng = Number(position.lng);
    this.evento.tipo = "Mi Ubicación";
    
     //@ts-ignore
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    this.clickMarker(position, 'home');
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
  }

  async inyectarMarker(data:any, tipo?: any){
    for (let item in data) {
      await this.clickMarker(data[item].position, tipo);
    }
  }

  async clickMarker(position:any, tipo? : any){
      // @ts-ignore
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const imgIcon = document.createElement('img');
    imgIcon.width = 40;    

    if(tipo == 'cars'){
      imgIcon.src = 'assets/cars.png';
    }else if(tipo == 'home'){
      imgIcon.src = 'assets/home.png';
    }else if(tipo == 'warning'){
      imgIcon.src = 'assets/warning.png';
    }

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: position,
      title: 'My Icon',
      content: imgIcon,
    });

     google.maps.event.addListener(marker, 'click', (event:any) => { 
      this.getInfoMarker(event)
    });
    
  }

  async centrarMapa(position:any){
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
      lng: position.lng,
      img : '',
      patente:'',
      data: {}
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
    this.clickMarker(this.latLng, 'warning');
    this.actModal = false;
    this.evento.tipo = 'w';
    this._eventService.setEvent(this.evento);
  }

  async getInfoMarker(marker : any){
    let marca = marker.latLng.toJSON();
    this.map.setZoom(16);
    this.map.setCenter({lat: Number(marca.lat), lng: Number(marca.lng)});
    let markSel :any;

    const miLoct:any = this.locationService.getMiPosition()[0];

    if(miLoct.position.lat == Number(marca.lat) && miLoct.position.lng == Number(marca.lng)){
      markSel = miLoct;
      markSel.img = 'assets/home.png';
    }else if(await this._eventService.searchMarker(marca)){
      markSel = await this._eventService.searchMarker(marca);
      markSel.img = 'assets/warning.png';
    }else if(await this._movilService.searchMarker(marca)){
      markSel = await this._movilService.searchMarker(marca);
      markSel.img = 'assets/cars.png';
    }else{
      this.actInfo = false;
      return
    }
    
    let latLng = markSel.position.lat +","+markSel.position.lng;
      const data = this.locationService.getDegeocode(latLng)
      .subscribe((data:any)=> {
        this.info.data = data.results[0].formatted_address;
      });
      
      this.info.address = markSel? markSel.title :'';
      this.info.img = markSel? markSel.img: '';
      this.info.patente = markSel? markSel.patente: '';
      this.info.lat = markSel? markSel.position.lat: '';
      this.info.lng = markSel? markSel.position.lng: '';
      this.actInfo = true;
      return
  }

  cerrar_info(){
    this.actInfo = false;
  }

  expandirCapa(){
    this.actCapa = !this.actCapa
  }

  setMap(tipo:any){

    if(tipo == 'events'){
      this.capaEvent = !this.capaEvent;
    }else if(tipo == 'movil'){
      this.capaMovil = !this.capaMovil;
    }

    this.ngOnInit();

  }

  async cargarMarkers(){

    if(this.capaEvent){
      const arrayMarker = await this._eventService.getEvents();
      this.inyectarMarker(arrayMarker, 'warning');
    }
    
    if(this.capaMovil){
      const arrayCars = await this._movilService.getMoviles();
      this.inyectarMarker(arrayCars, 'cars')
    }
 

    this._eventService.sendPositionMap.subscribe( (data) => {
      this.centrarMapa(data.position)
    });

  }

  async startCar(){
    this.clear_auto = !this.clear_auto;
    let maximo = this.arrayTrack.length;
    let num_avanza = 0;
    console.log(this.clear_auto)

    let timeId = setInterval(async () => {
      if(num_avanza >= maximo || this.clear_auto){ clearInterval(timeId); return}
      await this.avanzar_car(this.arrayTrack[num_avanza]);
      num_avanza++;
    },1500);

  }

  async avanzar_car(car:any){

    // @ts-ignore
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const imgIcon = document.createElement('img');
    imgIcon.width = 40;
    imgIcon.src = 'assets/car_circle.png';

    this.marker_car = new AdvancedMarkerElement({
      map: this.map,
      position: this.position_car,
      title: 'My Icon',
      content: imgIcon,
    });

    for (const key in car.position) {
      this.position_car.lat = Number(car.position[key].lat);
      this.position_car.lng = Number(car.position[key].lng);
    }

    this.map.setCenter(this.position_car);
    this.map.setZoom(18);

     google.maps.event.addListener(this.marker_car, 'click', (event:any) => { 
      this.getInfoMarker(event)
    });
    
  }

}

