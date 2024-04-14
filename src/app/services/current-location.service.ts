import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {
  apiKey = "AIzaSyCTkR3En4AT1HXqGZ5kgcTbJ24AoxzAd-A";
  constructor(private $http: HttpClient) { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resp => {
                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
            },
            err => {
                reject(err);
          });
    });
}

  getGeocode(address: string){
    return this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+this.apiKey);
  }

  getDegeocode(latlng: any){
    return this.$http.get<any[]>('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlng+'&key='+this.apiKey);
  }

}
