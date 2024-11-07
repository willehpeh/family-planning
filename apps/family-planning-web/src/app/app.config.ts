import { ApplicationConfig, provideZoneChangeDetection, } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { storeProviders } from './store.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    ...storeProviders,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient()
  ],
};
