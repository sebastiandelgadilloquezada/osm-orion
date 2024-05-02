import { Component, OnInit } from '@angular/core';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { CurrentLocationService } from '../../services/current-location.service';
import { EventsService } from '../../services/events.service';
import { Renderer } from 'leaflet';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(
    private locationService: CurrentLocationService,
    private _eventService: EventsService,
  ){

  }

  private locations : google.maps.LatLng[] = [];
  
  async ngOnInit() {

    const mislocations = await this._eventService.getEvents();

    for (let i = 0; i < mislocations.length; i++) {
        
      var lat = parseFloat(mislocations[i].position.lat)
      var lng = parseFloat(mislocations[i].position.lng)
      this.locations.push(new google.maps.LatLng(lat, lng))      
    }



    const miposition = await this.getLocation();
    // Request needed libraries.
    //@ts-ignore
      const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    //@ts-ignore
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    
      const map = new Map (document.getElementById("map"),
        {
          zoom: 3,
          center: miposition,
          mapId: 'DEMO_MAP_ID',
        }
      );
    
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });
    
      // Create an array of alphabetical characters used to label the markers.
      const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
      // Add some markers to the map.

      const markers = this.locations.map((position, i) => {
        // const label = labels[i % labels.length];
        // const pinGlyph = new google.maps.marker.PinElement({
        //   glyph: label,
        //   glyphColor: "white",
        // })

        const imgIcon = document.createElement('img');
        imgIcon.width = 40;
        imgIcon.src = 'assets/warning.png';

        const marker = new google.maps.marker.AdvancedMarkerElement({
          position,
          content: imgIcon,
        });
    
        marker.addListener("click", () => {
          infoWindow.setContent(position.lat + ", " + position.lng);
          infoWindow.open(map, marker);
        });
        return marker;
      });
    
      // Add a marker clusterer to manage the markers.
      var clusterStyles = [
        {
          textColor: 'white',
          url: 'assets/cars.png',
          height: 50,
          width: 50
        }
      ];

      var mcOptions = {
        gridSize: 50,
        styles: clusterStyles[0],
        maxZoom: 15
    };
    var config = { markers, map , mcOptions};
      var markerCluster = new MarkerClusterer(config);
    
  }

  getLocation() {
    return new Promise(async (resolve) => {
       await this.locationService.getPosition().then(pos => {
        let position = { lat: pos.lat, lng: pos.lng}
        resolve( position)
      });
    })
  }
  
}
