import { AuthState, featureKey } from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<AuthState>(featureKey);

export const selectAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.authenticated
);
