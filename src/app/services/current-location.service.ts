import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {
  apiKey = "AIzaSyCTkR3En4AT1HXqGZ5kgcTbJ24AoxzAd-A";
  public latLng = {
    lat: 0, 
    lng: 0
  }
  constructor(private $http: HttpClient) { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resp => {
                this.latLng.lat = resp.coords.latitude;
                this.latLng.lng = resp.coords.longitude;

                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
            },
            err => {
                reject(err);
          });
    });
  }

  getMiPosition(){
    return [
      {
        id: 1,
        tipo: 'h',
        title: 'Mi ubicacion',
        position: {lat: this.latLng.lat, lng: this.latLng.lng},
        estado: true
      },
    ]
  }

  getGeocode(address: string){
    return this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+this.apiKey);
  }

  getDegeocode(latlng: any){
    return this.$http.get<any[]>('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlng+'&key='+this.apiKey);
  }

}
