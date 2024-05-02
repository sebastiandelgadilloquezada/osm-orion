import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { EventsService } from '../services/events.service';
import { MovilService } from '../services/movil.service';
import { TypeMovilService } from '../services/type-movil.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  
  public menu_collapse = true;
  public menu_collapse1 = true;
  public menuActive = 'home';
  public despliegueInfo = false;
  public events : any;
  public moviles : any;
  public actEvents : boolean;
  public actMoviles: boolean = false;
  public playCar: boolean = false;
  public followCar: boolean = false;
  public convoy : any= [];
  public btn_convoy = false;
  public genConvoy = false;
  public title_moviles = 'Moviles'; 


  constructor(
    private _eventService: EventsService, 
    private _movilesServices: MovilService, 
    private _tipoMovil: TypeMovilService, 
    public _router: Router,
    public _movilService : MovilService
  ){}
  
  
  ngOnInit(): void {
    this.title_moviles = 'Moviles';
  }


  collapse_sidebar(menu:any, menuCollapse: boolean, despliegueInfo: boolean){
      
    if(menu == 'menu'){
      this.menu_collapse = !this.menu_collapse;

    }else if(menu == 'event'){
      this.getEventos();
      this.menu_collapse = !this.menu_collapse;
      this.actEvents = !this.actEvents;

    }else if(menu == 'movil'){
      this.getMoviles();
      this.menu_collapse = !this.menu_collapse;
      this.actMoviles = !this.actMoviles;
      // this.genConvoy = !this.genConvoy;
      
    }else if(menu == 'convoy'){
      // this.getMoviles();
      this.menu_collapse = !this.menu_collapse;
      this.genConvoy = !this.genConvoy;
    }
  }

  collapse_sidebar1(){
    this.menu_collapse1 = !this.menu_collapse1;
  }

  showMap(data: any){
    this._eventService.setMarkerMap(data);
  }

  getEventos(){
    this.events = this._eventService.getEvents();
  }

  getMoviles(){
    this.moviles = this._movilesServices.getMoviles();
  }

  playCarFn(){
    this.playCar = !this.playCar;
    this.followCar = this.playCar;
    this._movilesServices.playCarFn(this.playCar);
  }

  followCarFn(){
    this.followCar = !this.followCar;
    this._movilesServices.followCarFn(this.followCar);
  }

  tipoMovil(patente:any){
    return this._tipoMovil.getTipoMovil(patente);
  }

  addConvoy(car:any){
    console.log(car)
    this.btn_convoy = true;
    // 
    this.convoy.push(car);
  }

  clickConvoy(){
    this.title_moviles = 'Convoy';
    this.followCar = !this.followCar;
    for (let i = 0; i < this.convoy.length; i++) {
      let index = this.moviles.indexOf(this.convoy[i]);
      this.moviles.splice(index, 1) 
    }
    this.btn_convoy = false;
    this.actMoviles = false;
    this.genConvoy = true;
    this._movilService.setConvoy(this.convoy);
    this.getMoviles();
    this._movilesServices.playConvoyFn(true);
    this._router.navigate(['dashboard/convoy', 1]);
  }









}
