import { Injectable } from '@angular/core';
import * as jsonData from '../../assets/track.json';

import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TrackeoService {

  trackService = [
    {},
  ]

  constructor() { }

  getTrack(){
     return (jsonData as any).trackeo;
  }
}
