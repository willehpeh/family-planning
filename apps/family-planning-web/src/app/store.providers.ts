import { provideState, provideStore } from '@ngrx/store';
import { disclaimerReducer, featureKey as disclaimerFeatureKey } from './state/disclaimer.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { DisclaimerEffects } from './state/disclaimer.effects';
import { authReducer, featureKey as authFeatureKey } from './auth/state/auth.reducer';
import { AuthEffects } from './auth/state/auth.effects';

export const storeProviders = [
  provideStore(),
  provideState({ name: authFeatureKey, reducer: authReducer }),
  provideState({ name: disclaimerFeatureKey, reducer: disclaimerReducer }),
  provideStoreDevtools({ logOnly: !isDevMode() }),
  provideEffects([
    AuthEffects,
    DisclaimerEffects
  ]),
];
