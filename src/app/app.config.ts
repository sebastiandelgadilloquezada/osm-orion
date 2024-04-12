import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { GOOGLE_MAPS_API_CONFIG, NgMapsGoogleModule } from '@ng-maps/google';
import { GoogleMapsModule } from '@angular/google-maps';

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    provideRouter(routes,
    withViewTransitions({
      skipInitialTransition: true,
        }
      )
    ),
    importProvidersFrom(
      HttpClientModule,
      CommonModule,
      BrowserAnimationsModule,
      GoogleMapsModule,
      
    )
  ]
};
