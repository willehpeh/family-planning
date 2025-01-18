import { uiFeatureKey, UiState } from './ui.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUiState = createFeatureSelector<UiState>(uiFeatureKey);

export const selectSideMenuOpen = createSelector(
  selectUiState,
  (state: UiState) => state.sideMenuOpen
);

export const selectBackButtonPath = createSelector(
  selectUiState,
  (state: UiState) => state.backButtonPath
);
