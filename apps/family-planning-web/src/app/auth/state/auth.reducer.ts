import { createReducer, on } from '@ngrx/store';
import { LoadHouseholdInfoFailure, LoadHouseholdInfoSuccess, LoadUserInfoSuccess } from './auth.actions';

export const featureKey = 'auth';

export interface AuthState {
  user: unknown;
  authenticated: boolean;
  householdId: string | null;
  householdName: string | null;
}

export const initialState: AuthState = {
  user: null,
  authenticated: false,
  householdId: null,
  householdName: null,
};

export const authReducer = createReducer(
  initialState,
  on(LoadUserInfoSuccess, (state, { user }): AuthState => ({ ...state, user, authenticated: true })),
  on(LoadHouseholdInfoSuccess, (state, { householdId, householdName }): AuthState => ({ ...state, householdId, householdName })),
  on(LoadHouseholdInfoFailure, (state): AuthState => ({ ...state, householdId: null })),
);
