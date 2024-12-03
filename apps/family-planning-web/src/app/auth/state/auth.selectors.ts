import { AuthState, authFeatureKey } from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.authenticated
);

export const selectUserInfo = createSelector(
  selectAuthState,
  (state: AuthState) => state.userInfo
);

export const selectUserGivenName = createSelector(
  selectUserInfo,
  (userInfo) => userInfo?.given_name || ''
);
