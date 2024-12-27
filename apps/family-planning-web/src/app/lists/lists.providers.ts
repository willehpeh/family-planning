import { provideState } from '@ngrx/store';
import { listsFeature } from './state/lists.reducer';
import { provideEffects } from '@ngrx/effects';
import { ListsEffects } from './state/lists.effects';
import { ListsFacade } from './state/lists.facade';

export const LISTS_PROVIDERS = [
  provideState(listsFeature),
  provideEffects(ListsEffects),
  ListsFacade
];
