import { createReducer, on } from '@ngrx/store';
import { ClearBackButton, CloseSideMenu, OpenSideMenu, SetBackButtonPath } from './ui.actions';

export const uiFeatureKey = 'ui';

export interface UiState {
  sideMenuOpen: boolean;
  backButtonPath: string;
}

export const initialState: UiState = {
  sideMenuOpen: false,
  backButtonPath: ''
};

export const uiReducer = createReducer(
  initialState,
  on(OpenSideMenu, (state): UiState => ({ ...state, sideMenuOpen: true })),
  on(CloseSideMenu, (state): UiState => ({ ...state, sideMenuOpen: false })),
  on(SetBackButtonPath, (state, { path }): UiState => ({ ...state, backButtonPath: path })),
  on(ClearBackButton, (state): UiState => ({ ...state, backButtonPath: '' }))
);
