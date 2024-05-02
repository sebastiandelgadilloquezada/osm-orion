import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {
  apiKey = "AIzaSyCTkR3En4AT1HXqGZ5kgcTbJ24AoxzAd-A";
  key_matrix = "AIzaSyD0SHnbHno-JbX8X2AP3F8Qs0K5iRG3TuY";
  public latLng = {
    lat: 0, 
    lng: 0
  }

  constructor(private $http: HttpClient) { 

  }

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

  getDistance(latOrigen:any, lngOrigen:any, latDestino:any, lngDestino:any){

    var origin1 = new google.maps.LatLng(latOrigen,lngOrigen);
    var destinationB = new google.maps.LatLng(latDestino, lngDestino);

     return new Promise(resolve => {

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin1],
          destinations: [destinationB],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        }, callback);
      
      function callback(response:any, status:any) {
        resolve(response)
      }
  
     })    
    
  }

}
