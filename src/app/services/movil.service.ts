import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovilService {
  public moviles = [
    {
      id: 1,
      tipo: 'Vehìculo',
      patente: 'JVCH-49',
      velocidad: '45',
      position: {lat: -32.97498257, lng: -71.25357537},
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 2,
      tipo: 'Camión',
      patente: 'JVCH-50',
      velocidad: '60',
      position: {lat: -32.96758988, lng: -71.25399013},
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 3,
      tipo: 'Furgón',
      patente: 'JVCH-49',
      velocidad: '20',
      position: {lat: -32.96567288, lng: -71.25467094},
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: false
    },
    {
      id: 4,
      tipo: 'Furgon 3/4',
      patente: 'JVFF-49',
      velocidad: '37',
      position: {lat: -32.98932691432597, lng: -71.52403902734706},
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 5,
      tipo: 'Furgón pasajeros',
      patente: 'VVCH-49',
      velocidad: '20',
      position: {lat: -32.93368712310296, lng: -71.53150652091033 },
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 6,
      tipo: 'Auto',
      patente: 'JVBBCH-49',
      velocidad: '20',
      position: {lat: -32.96213832595877, lng: -71.52217304499663 },
      fecha: '24/04/2024 15:03',
      color: '#FFC300 ',
      estado: true
    },
    {
      id: 7,
      tipo: 'Mini car',
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
}
