import { provideState, provideStore } from '@ngrx/store';
import { disclaimerReducer } from './state/disclaimer.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { DisclaimerEffects } from './state/disclaimer.effects';

export const storeProviders = [
  provideStore(),
  provideState({ name: 'disclaimer', reducer: disclaimerReducer }),
  provideStoreDevtools({ logOnly: !isDevMode() }),
  provideEffects([DisclaimerEffects]),
];
