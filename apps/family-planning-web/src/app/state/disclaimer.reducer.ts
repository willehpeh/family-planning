import { createReducer, on } from '@ngrx/store';
import { AcceptDisclaimer } from './disclaimer.actions';

export const featureKey = 'disclaimer';

export interface DisclaimerState {
  disclaimerSeen: boolean;
}

export const initialState: DisclaimerState = {
  disclaimerSeen: false,
};

export const disclaimerReducer = createReducer(
  initialState,
  on(AcceptDisclaimer, state => ({ ...state, disclaimerSeen: true })),
);
