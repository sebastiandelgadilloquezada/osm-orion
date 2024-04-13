import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeEventsService {

  constructor() { }

  private typeEvents = [
    { 
      id: 1,
      tipo: 'Accidente',
      color: '#FF0E0E',
    },
    { 
      id: 1,
      tipo: 'Vehículo detenido',
      color: '#FF0E0E',
    },
    { 
      id: 1,
      tipo: 'Vehículo en pane',
      color: '#FF0E0E',
    },
    { 
      id: 1,
      tipo: 'Vehículo con problemas mécanicos',
      color: '#FF0E0E',
    },
    { 
      id: 1,
      tipo: 'Calle cerrada',
      color: '#FF0E0E',
    },
    { 
      id: 1,
      tipo: 'Calle inhabilitada',
      color: '#FF0E0E',
    },
    { 
      id: 1,
      tipo: 'Tràfico lento',
      color: '#FF0E0E',
    }
  ];

  getTypesEvents(){
    return this.typeEvents;
  }


}
