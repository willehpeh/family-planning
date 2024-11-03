import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { disclaimerReducer } from "./state/disclaimer.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({ name: 'disclaimer', reducer: disclaimerReducer }),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
