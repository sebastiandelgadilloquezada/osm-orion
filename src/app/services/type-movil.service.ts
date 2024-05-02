import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeMovilService {

  public tiposMoviles = [
    {
      id: 1,
      tipo: 'Vehículo',
      patente: 'XJ5679',
    },
    {
      id: 2,
      tipo: 'Furgón C.',
      patente: 'VPSN-43',
    },
    {
      id: 3,
      tipo: 'Camión 3/4',
      patente: 'KKGG59',
    },
    {
      id: 4,
      tipo: 'Furgón P.',
      patente: 'PLMB-23',
    },
    {
      id: 5,
      tipo: 'Van',
      patente: 'PCMB-32',
    },
    {
      id: 6,
      tipo: 'Bus',
      patente: 'JVBBCH-49',
    },
    {
      id: 7,
      tipo: 'Liebre',
      patente: 'JVXX-49',
    },
  ]

  constructor() { }


  getTipoMoviles(){
    return this.tiposMoviles;
  }


  getTipoMovil(patente: any){
    
    let tipo = "";
    for (const key in this.tiposMoviles) {
       if(patente == this.tiposMoviles[key].patente){
        tipo = this.tiposMoviles[key].tipo;
       }
    } 

    return tipo;
  }


}
