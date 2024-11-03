import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DisclaimerState } from "./disclaimer.reducer";

export const selectDisclaimerState = createFeatureSelector<DisclaimerState>('disclaimer');
export const selectDisclaimerSeen = createSelector(
  selectDisclaimerState,
  (state: DisclaimerState) => state.disclaimerSeen
);
