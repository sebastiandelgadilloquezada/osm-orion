import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from '../../services/current-location.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public latitude : number;
  public longitude: number;
  private map: any;

  public myIcon = L.icon({
    iconUrl: 'assets/marker.png',
    shadowUrl: 'assets/marker_shadow.png',
    
 });
  

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.latitude, this.longitude ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    var marker = L.marker([this.latitude, this.longitude], {icon: this.myIcon}).addTo(this.map);
  }

  constructor(private locationService: CurrentLocationService){}

  async ngOnInit() {
    await this.getLocation();
    this.initMap()
  }


  async getLocation() {
    await this.locationService.getPosition().then(pos => {
        this.latitude = pos.lat;
        this.longitude = pos.lng;
        console.log(this.latitude)
    });
  }
}
