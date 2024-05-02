import { Component, OnInit } from '@angular/core';
import { MovilService } from '../../services/movil.service';
import { ActivatedRoute } from '@angular/router';
import { TrackeoService } from '../../services/trackeo.service';
import { CurrentLocationService } from '../../services/current-location.service';

@Component({
  selector: 'app-convoy',
  standalone: true,
  imports: [],
  templateUrl: './convoy.component.html',
  styleUrl: './convoy.component.css'
})
export class ConvoyComponent implements OnInit{

  private locations : any = [];
  private statePlay : any = 0;
  private actstate : any = 0;
  private markers : any = [];
  private arrayTrack : any = [];
  private inc = 0;
  private map :any;
  private center_carConvoy = true;
  private arrayCar : number[]= [];

  constructor(
    private _movilService : MovilService,
    private activatedRoute: ActivatedRoute,
    private _trackService: TrackeoService,
    private _currentLocationService: CurrentLocationService
  ){
  
    
  }
  
  async ngOnInit() {
    this.statePlay = this.activatedRoute.snapshot.paramMap.get('id');
    this.locations = this._movilService.getConvoy();

    const tracker = JSON.stringify(this._trackService.getTrack());
    this.arrayTrack = JSON.parse(tracker);


    this._movilService.followCarEM.subscribe( (status) => {
      this.center_carConvoy = status;
     
    });

    //@ts-ignore
      const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    //@ts-ignore
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    
      this.map = new Map (document.getElementById("map"),
        {
          zoom: 3,
          center: {lat: -33.0303, lng: -71.239823},
          mapId: 'DEMO_MAP_ID',
        }
      );
    
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });
    
      // Create an array of alphabetical characters used to label the markers.
      const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
      // Add some markers to the map.
      console.log("state play",this.statePlay)

      if(this.statePlay != 0){
      this.markers = this.locations.map((car:any, i:any) => {
        const label = 'info';
        const pinGlyph = new google.maps.marker.PinElement({
          glyph: label,
          glyphColor: "white",
        })

        const imgIcon = document.createElement('img');
        imgIcon.width = 40;
        if(i == 0 ){
          imgIcon.src = 'assets/cars_convoy_lider.png';
        }else{
          imgIcon.src = 'assets/cars_convoy.png';
        }
        

        console.log(car.position.lat, car.position.lng)

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: this.map,
          position: new google.maps.LatLng(car.position.lat, car.position.lng),
          content: imgIcon,
        });
    
        marker.addListener("click", () => {
          infoWindow.setContent(car.patente);
          infoWindow.open(this.map, marker);
        });
        return marker;
      });
    }

    this.playConvoy();   
  }

  playConvoy(){
    setInterval( () => {
        this.sendPosition()
    },3000)
      
  }

  async sendPosition(){
    
    let cantCar = this.locations.length;
    if(this.arrayCar.length == 0){
      this.arrayCar = new Array(cantCar).fill(0);
    }
    
    for (let e = 0; e < this.arrayCar.length; e++) {
      if(this.arrayCar[e] == 0){
        this.arrayCar[e] = this.arrayCar[e]+1;
        break;
      }else{
        this.arrayCar[e] = this.arrayCar[e]+1;
      }
      
    }

    for (let j = 0; j < this.markers.length; j++) {
      if(this.center_carConvoy){
        this.map.setZoom(18);
      this.map.setCenter({lat: Number(this.arrayTrack[this.arrayCar[0]].position.lat), lng: Number(this.arrayTrack[this.arrayCar[0]].position.lng)});
      }
      this.locations[j].velocidad = this.arrayTrack[this.arrayCar[j]].speed.split(",")[0];
      this.locations[0].distancia = 0;
      this.markers[j].position = { lat : Number(this.arrayTrack[this.arrayCar[j]].position.lat) , lng: Number(this.arrayTrack[this.arrayCar[j]].position.lng) }
      const dist :any= await this._currentLocationService.getDistance(
        Number(this.arrayTrack[this.arrayCar[0]].position.lat), 
         Number(this.arrayTrack[this.arrayCar[0]].position.lng),
         Number(this.arrayTrack[this.arrayCar[j]].position.lat), 
         Number(this.arrayTrack[this.arrayCar[j]].position.lng),
      )
      
      this.locations[j].distancia = dist.rows[0].elements[0].distance.value;
     
      }
    
    this.inc = this.inc +1;

  }

  
}

