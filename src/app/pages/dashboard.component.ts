import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { EventsService } from '../services/events.service';

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
  public mostrarInfo : boolean;

  constructor(private _eventService: EventsService){

  }
  ngOnInit(): void {
    
  }


  collapse_sidebar(menu:any, menuCollapse: boolean, despliegueInfo: boolean){
    
    if(menu == 'menu'){
      this.menu_collapse = !this.menu_collapse;
    }else if(menu == 'event'){
      this.getEventos();
      this.menu_collapse = !this.menu_collapse;
      this.despliegueInfo = !this.menu_collapse;
      if(!this.menu_collapse){
        setTimeout(() => {
          console.log('mostrar');
          this.mostrarInfo = true;
        }, 200);
      }else{
        this.mostrarInfo = false;
      }
    }else{
      
    }
  }

  showMap(data: any){
    this._eventService.setMarkerMap(data);
  }

  getEventos(){
    this.events = this._eventService.getEvents();
  }









}
