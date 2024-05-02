import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapGroundOverlay } from '@angular/google-maps';
import { CurrentLocationService } from '../../services/current-location.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-overlays',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, FormsModule],
  templateUrl: './overlays.component.html',
  styleUrl: './overlays.component.css'
})
export class OverlaysComponent implements OnInit{

  public center : any;
  public zoom = 18;
  public map :any;
  public imageBounds : google.maps.LatLngBoundsLiteral;
  public imageUrl = 'assets/mapa.svg';
  public showCoord = false;
  public fileToUpload: File | null = null;
  private latLng :any;
  
  public over = {
      img  :"",
      lat1 : 0,
      lng1 : 0,
      lat2 : 0,
      lng2 : 0
    }

    private loader = new Loader({
      apiKey: "AIzaSyDQcxcSX1BJHygKafP4FHBjj_cE68c-THs",
      version: "weekly",
    });
  
  constructor(private locationService: CurrentLocationService){

  }
  
  async ngOnInit() {
    const posicion:any = await this.getLocation()
    this.center = {lat: posicion.lat, lng: posicion.lng}
    this.loader.load().then(async () => {
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      this.map = new Map(document.getElementById("map"), {
        center: this.center,
        mapTypeId: 'roadmap',
        zoom: 18,
        mapId: '34204983242',
        gestureHandling: "cooperative",
      } as google.maps.MapOptions);
        
      google.maps.event.addListener(this.map, 'click', (event:any) => {
        this.latLng = event.latLng.toJSON();
        
        console.log(this.over)

        if(this.over.lat1 == 0 ){
              this.over.lat1 = this.latLng.lat;
        }
        
        if(this.over.lng1 == 0 ){
          this.over.lng1 = this.latLng.lng;
          return
        }
    
        if(this.over.lat2 == 0 ){
          this.over.lat2 = this.latLng.lat;
        }
    
        if(this.over.lng2 == 0 ){
          this.over.lng2 = this.latLng.lng;
        }
  
        


     });

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

  habButton(){
    this.showCoord = !this.showCoord;
  }

  handleFileInput(files: any) {

    console.log(files)
    // this.fileToUpload = files.item(0);
  }
  
  subirImg(){
    console.log(this.over)
    var historicalOverlay;

    var imageBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(this.over.lat2, this.over.lng2),      
      new google.maps.LatLng(this.over.lat1, this.over.lng1)
      );

    historicalOverlay = new google.maps.GroundOverlay(
      this.imageUrl,
      imageBounds);
      
      historicalOverlay.setMap(this.map);
      this.map.fitBounds(historicalOverlay.getBounds(), {'bottom': -50, 'left': -50, 'top': -50, 'right': -50});
    this.showCoord = false;
  }
  
}
