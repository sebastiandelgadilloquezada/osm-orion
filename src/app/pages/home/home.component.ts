import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from '../../services/current-location.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { Loader } from "@googlemaps/js-api-loader"
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';

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
  geocoder: google.maps.Geocoder;
  public txtSearch : any;
  public wresult = false;
  public info: any;

  private loader = new Loader({
    apiKey: "AIzaSyCTkR3En4AT1HXqGZ5kgcTbJ24AoxzAd-A",
    version: "weekly",
  });

  txtSelect :any = [];

  

constructor(private locationService: CurrentLocationService, private _eventService: EventsService){}

  async ngOnInit() {
    const position = await this.getLocation();
    await this.initMap(position);
    const arrayMarker = await this._eventService.getEvents();
    this.inyectarMarker(arrayMarker);

    this._eventService.sendPositionMap.subscribe( (data) => {
      console.log("emiter",data.position);
      this.centrarMapa(data.position)
    });

    google.maps.event.addListener(this.map, 'click', (event:any) => {
      this.clickMarker(event.latLng);
   });
  }


  getLocation() {
    return new Promise(async (resolve) => {
       await this.locationService.getPosition().then(pos => {
        let position = { lat: pos.lat, lng: pos.lng}
        console.log("getPosition: ",position)
        resolve( position)
      });
    })
  }

  async initMap(position : any): Promise<void> {
    console.log("InitMap",typeof position.lat)
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

     //@ts-ignore
     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
     const marker = new AdvancedMarkerElement({
       map: this.map,
       position: {lat: Number(position.lat), lng: Number(position.lng)},
       title: 'Mi ubicación',
     });
  }

  async buscarMarker(position:any){
   
    console.log("InitMap",typeof position.lat)
    this.loader.load().then(async () => {
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      this.map = new Map(document.getElementById("map"), {
        center: {lat: Number(position.lat), lng: Number(position.lng)},
        zoom: 12,
        mapId: 'DEMO_MAP_ID'
      } as google.maps.MapOptions);
    });

      //@ts-ignore
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: {lat: Number(position.lat), lng: Number(position.lng)},
        title: 'Mi ubicación',
      });
  }

  async inyectarMarker(data:any){
    for (let item in data) {
      // @ts-ignore
     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
     const marker = new AdvancedMarkerElement({
       map: this.map,
       position: {lat: Number(data[item].position.lat), lng: Number(data[item].position.lng)},
       title: 'Mi ubicación',
     });
    }
  }

  async clickMarker(position:any){
      
    this._eventService.setEvent(position);
      // @ts-ignore
     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
     const marker = new AdvancedMarkerElement({
       map: this.map,
       position: position,
       title: 'Mi ubicación',
     });
    
  }

  async centrarMapa(position:any){
    console.log(position)
    this.map.setZoom(18);
    this.map.setCenter({lat: Number(position.lat), lng: Number(position.lng)});
   


    // this.loader.load().then(async () => {
    //   // //@ts-ignore
    //   // const { Map } = await google.maps.importLibrary("maps");
    //   // this.map = new Map(document.getElementById("map"), {
    //   //   center: {lat: Number(position.lat), lng: Number(position.lng)},
    //   //   zoom: 18,
    //   //   mapId: 'DEMO_MAP_ID',
    //   //   gestureHandling: "cooperative",
    //   // } as google.maps.MapOptions);
    // });
  }
  
  buscar(){
    console.log(this.txtSearch)
    this.geocode(this.txtSearch)
  }

  async geocode(request: string) {
     
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
      'address': direction,
      'lat': position.lat,
      'lng': position.lng
    }
  }

  revisarTxt(){
    if(this.txtSearch.length <= 0){
      this.wresult = false;
    }
  }


}

