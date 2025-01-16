import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection, } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { storeProviders } from './store.providers';
import { withCredentialsInterceptor } from './auth/interceptors/with-credentials.interceptor';
import { Title } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    ...storeProviders,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([withCredentialsInterceptor]),
    ),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (title: Title) => title.setTitle('Family Planning'),
      deps: [Title]
    }
  ],
};
