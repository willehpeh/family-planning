import { createReducer, on } from '@ngrx/store';
import { LoadUserInfoSuccess, Logout } from './auth.actions';
import { UserInfoDto } from '../types/user-info.dto';

export const authFeatureKey = 'auth';

export interface AuthState {
  userInfo: UserInfoDto | null;
  authenticated: boolean;
}

export const initialState: AuthState = {
  userInfo: null,
  authenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(LoadUserInfoSuccess, (state, { userInfo }): AuthState => ({ ...state, userInfo, authenticated: true })),
  on(Logout, (state): AuthState => ({ ...state, userInfo: null, authenticated: false })),
);
