import { createReducer, on } from '@ngrx/store';
import { CloseSideMenu, OpenSideMenu } from './ui.actions';

export const uiFeatureKey = 'ui';

export interface UiState {
  sideMenuOpen: boolean;
}

export const initialState: UiState = {
  sideMenuOpen: false,
};

export const uiReducer = createReducer(
  initialState,
  on(OpenSideMenu, (state): UiState => ({ ...state, sideMenuOpen: true })),
  on(CloseSideMenu, (state): UiState => ({ ...state, sideMenuOpen: false })),
);
