import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovilService {

  @Output() followCarEM: EventEmitter<any> = new EventEmitter<any>();
  @Output() playCarEM: EventEmitter<any> = new EventEmitter<any>();

  public moviles = [
    {
      id: 1,
      tipo: 'm',
      title: 'Vehìculo',
      patente: 'JVCH-49',
      velocidad: '45',
      position: {lat: -32.89747779558939, lng: -71.50375086435182},
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 2,
      title: 'Camión',
      tipo: 'm',
      patente: 'JVCH-50',
      velocidad: '60',
      position: {lat: -32.912439952763876, lng: -71.49518428700598},
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 3,
      title: 'Furgón',
      tipo: 'm',
      patente: 'JVCH-49',
      velocidad: '20',
      position: {lat: -32.93962488493326, lng: -71.48184064018372},
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: false
    },
    {
      id: 4,
      title: 'Furgon 3/4',
      tipo: 'm',
      patente: 'JVFF-49',
      velocidad: '37',
      position: {lat: -32.98932691432597, lng: -71.52403902734706},
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 5,
      title: 'Furgón pasajeros',
      tipo: 'm',
      patente: 'VVCH-49',
      velocidad: '20',
      position: {lat: -32.93368712310296, lng: -71.53150652091033 },
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 6,
      tipo: 'm',
      title:'Auto',
      patente: 'JVBBCH-49',
      velocidad: '20',
      position: {lat: -32.96213832595877, lng: -71.52217304499663 },
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 7,
      title: 'Mini car',
      tipo: 'm',
      patente: 'JVXX-49',
      velocidad: '24',
      position: {lat: -32.953868919750654, lng: -71.53884523021239 },
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    }
  ]
  
  constructor() { }

  getMoviles(){
    return this.moviles;
  }

  async searchMarker(latLng:any){
    let result : any;
    return new Promise((resolve) =>{
      for (const key in this.moviles) {
        if(this.moviles[key].position.lat == latLng.lat && this.moviles[key].position.lng == latLng.lng){
          result = this.moviles[key] ;
        }
      }
      
      if(result){
        resolve(result);
      }else{
        resolve(false);
      }
    })
  }

  followCarFn(status:any){
    console.log("followCarFn",status)
    this.followCarEM.emit(status);
  }

  playCarFn(status: any){
    console.log("playCarFn",status)
    this.playCarEM.emit(status);
  }
}
