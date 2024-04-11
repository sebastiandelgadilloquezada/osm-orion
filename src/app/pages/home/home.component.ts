import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from '../../services/current-location.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { Loader } from "@googlemaps/js-api-loader"
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  public map: google.maps.Map;
  public position : any;
  public zoom = 4;
  private mapId = "DEMO_MAP_ID";
  geocoder: google.maps.Geocoder;
  public txtSearch : any;
  public wresult = false;
  public info = "";

  private loader = new Loader({
    apiKey: "AIzaSyCTkR3En4AT1HXqGZ5kgcTbJ24AoxzAd-A",
    version: "weekly",
  });

  txtSelect :any = [];

  

constructor(private locationService: CurrentLocationService){}

  async ngOnInit() {
    await this.getLocation();
    await this.initMap();
  }


  async getLocation() {
    await this.locationService.getPosition().then(pos => {
        this.latitude = pos.lat;
        this.longitude = pos.lng;
      
    });
  }

  zoomIn() {
    // if (this.zoom < this.options.maxZoom) this.zoom++;
  }
 
  zoomOut() {
    // if (this.zoom > this.options.minZoom) this.zoom--;
  }

  async initMap(position? : any): Promise<void> {
    this.loader.load().then(async () => {
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      this.map = new Map(document.getElementById("map"), {
        center: { lat: position? position.lat : this.latitude, lng: position? position.lng : this.longitude },
        zoom: 12,
        mapId: 'DEMO_MAP_ID'
      } as google.maps.MapOptions);
    });

     //@ts-ignore
     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
     const marker = new AdvancedMarkerElement({
       map: this.map,
       position: {lat: position? position.lat : this.latitude, lng: position? position.lng : this.longitude },
       title: 'Mi ubicación',
     });
  }

  // addMarkers() {
  //   this.markers.push({
  //     position: {
  //       lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
  //       lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
  //     },
  //     label: {
  //       color: 'red',
  //       text: 'Marker label ' + (this.markers.length + 1),
  //     },
  //     title: 'Marker title ' + (this.markers.length + 1),
  //     options: { animation: google.maps.Animation.BOUNCE },
  //   });
  // }
  
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
    this.info = `${direction} lat:${position.lat} long: ${position.lng}`;

  }

  revisarTxt(){
    if(this.txtSearch.length <= 0){
      this.wresult = false;
    }
  }


}

