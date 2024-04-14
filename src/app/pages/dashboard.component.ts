import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { EventsService } from '../services/events.service';
import { MovilService } from '../services/movil.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  
  public menu_collapse = true;
  public menuActive = 'home';
  public despliegueInfo = false;
  public events : any;
  public moviles : any;
  public actEvents : boolean;
  public actMoviles: boolean = false;

  constructor(private _eventService: EventsService, private _movilesServices: MovilService){

  }
  ngOnInit(): void {
    
  }


  collapse_sidebar(menu:any, menuCollapse: boolean, despliegueInfo: boolean){
      
    console.log(menu)
    console.log(menuCollapse)
    console.log(menu)


    if(menu == 'menu'){
      this.menu_collapse = !this.menu_collapse;

    }else if(menu == 'event'){
      console.log("clo clo clo")
      this.getEventos();
      this.menu_collapse = !this.menu_collapse;
      this.actEvents = !this.actEvents;

    }else if(menu == 'movil'){
      console.log("cla cla cla")
      this.getMoviles();
      this.menu_collapse = !this.menu_collapse;
      this.actMoviles = !this.actMoviles;

    }
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









}
