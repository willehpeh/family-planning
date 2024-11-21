import { ApplicationConfig, provideZoneChangeDetection, } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { storeProviders } from './store.providers';
import { withCredentialsInterceptor } from './interceptors/with-credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    ...storeProviders,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([withCredentialsInterceptor])
    )
  ],
};
