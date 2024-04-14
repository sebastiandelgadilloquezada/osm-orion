import { EventEmitter, Injectable, Output } from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  
  public events : any;
  @Output() sendPositionMap: EventEmitter<any> = new EventEmitter<any>();


  constructor(private datePipe: DatePipe) { 

      
    this.events = [
      {
        id: 1,
        tipo: 'w',
        title: 'Accidente',
        position: {lat: -32.96544752549346, lng: -71.54461943043896},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 2,
        tipo: 'w',
        title: 'Otro evento',
        position: {lat: -32.967988, lng: -71.539013},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 3,
        tipo: 'w',
        title: 'Tramo cortado',
        position: {lat: -32.980427138148926, lng: -71.53025683893584},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: false
      },
      {
        id: 4,
        tipo: 'w',
        title: 'Transito lento',
        position: {lat: -32.959257, lng: -71.525537},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 5,
        tipo: 'w',
        title: 'Calle cortada',
        position: {lat: -32.952385770506574, lng: -71.45386754853719},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 6,
        tipo: 'w',
        title: 'Bache en la vía',
        position: {lat: -33.03947355645192, lng: -71.58933491092728},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 7,
        tipo: 'w',
        title: 'Vehículo detenido',
        position: {lat: -32.95232058792421, lng: -71.53397855188419},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      }
    ]
  }

  getEvents(){
    return this.events;
  }

  setEvent(evento: any){
  
    var date = new Date();
    this.events.push({
        id: this.events.length+1,
        tipo: evento.tipo,
        title: evento.title,
        position: {lat: Number(evento.lat), lng: Number(evento.lng)},
        fecha: this.datePipe.transform(date,"dd/MM/yyyy HH:mm:ss"),
        color: '#FFC300 ',
        estado: true
    });
    return this.events
  }

  changeStatusEvent(event:any){

  }

  setMarkerMap(data:any){
    this.sendPositionMap.emit(data);
  }

  
  async searchMarker(latLng:any){
    let result : any;
    return new Promise((resolve) =>{
      for (const key in this.events) {
        if(this.events[key].position.lat == latLng.lat && this.events[key].position.lng == latLng.lng){
          result = this.events[key] ;
        }
      }
      
      if(result){
        resolve(result);
      }else{
        resolve(false);
      }
    })
  }


  
}
