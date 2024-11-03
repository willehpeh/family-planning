import { createReducer, on } from '@ngrx/store';
import { AcceptDisclaimer } from './disclaimer.actions';

export type DisclaimerState = {
  disclaimerSeen: boolean;
};

export const initialState: DisclaimerState = {
  disclaimerSeen: false,
};

export const disclaimerReducer = createReducer(
  initialState,
  on(AcceptDisclaimer, state => ({ ...state, disclaimerSeen: true })),
);
