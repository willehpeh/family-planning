import { createReducer, on } from '@ngrx/store';
import { LoadUserInfoSuccess } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: unknown;
  authenticated: boolean;
}

export const initialState: AuthState = {
  user: null,
  authenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(LoadUserInfoSuccess, (state, { user }): AuthState => ({ ...state, user, authenticated: true })),
);
