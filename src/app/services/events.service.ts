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
        tipo: 'Accidente',
        position: {lat: '-32.979257', lng: '-71.535537'},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 2,
        tipo: 'Otro evento',
        position: {lat: '-32.967988', lng: '-71.539013'},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 3,
        tipo: 'Tramo cortado',
        position: {lat: '-32.965288', lng: '-71.546094'},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: false
      },
      {
        id: 4,
        tipo: 'Transito lento',
        position: {lat: '-32.959257', lng: '-71.525537'},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 5,
        tipo: 'Calle cortada',
        position: {lat: '-32.92', lng: '-71.54'},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 6,
        tipo: 'Bache en la vía',
        position: {lat: '-32.934', lng: '-71.5564'},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      },
      {
        id: 7,
        tipo: 'Vehículo detenido',
        position: {lat: '-32.93421', lng: '-71.55674'},
        fecha: '24/04/2024 15:03',
        color: '#FFC300 ',
        estado: true
      }
    ]
  }

  getEvents(){
    return this.events
  }

  setEvent(evento: any){
    console.log("evento: ",evento)
    var date = new Date();
    this.events.push({
        id: this.events.length+1,
        tipo: evento.tipo,
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



  
}
