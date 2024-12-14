import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { authFeatureKey, authReducer } from './auth/state/auth.reducer';
import { AuthEffects } from './auth/state/auth.effects';
import { HouseholdsEffects } from './households/state/households.effects';
import { householdsFeatureKey, householdsReducer } from './households/state/households.reducer';

export const storeProviders = [
  provideStore(),
  provideState({ name: authFeatureKey, reducer: authReducer }),
  provideState({ name: householdsFeatureKey, reducer: householdsReducer }),
  provideStoreDevtools({ logOnly: !isDevMode() }),
  provideEffects([
    AuthEffects,
    HouseholdsEffects
  ]),
];
