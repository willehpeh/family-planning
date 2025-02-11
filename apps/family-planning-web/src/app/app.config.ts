import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { storeProviders } from './store.providers';
import { withCredentialsInterceptor } from './auth/interceptors/with-credentials.interceptor';
import { Title } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    ...storeProviders,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([withCredentialsInterceptor]),
    ),
    provideAnimations(),
    provideAppInitializer(() => {
      inject(Title).setTitle('Family Planning');
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
};
