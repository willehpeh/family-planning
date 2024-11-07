import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { TodoList } from '../models/todo-list';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { LoadAllLists, LoadAllListsSuccess } from './lists.actions';

export const featureKey = 'lists';

export interface ListsState extends EntityState<TodoList>{
  loading: boolean;
}

export const adapter = createEntityAdapter<TodoList>({
  selectId: list => list.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const initialState: ListsState = adapter.getInitialState({
  loading: false
});

export const listsFeature = createFeature({
  name: featureKey,
  reducer: createReducer(
    initialState,
    on(LoadAllLists, state => ({ ...state, loading: true })),
    on(LoadAllListsSuccess, (state, { lists }) => adapter.addMany(lists, { ...state, loading: false })),
  ),
  extraSelectors: ({ selectIds, selectEntities }) => ({
    selectAllLists: createSelector(
      selectIds,
      selectEntities,
      (ids, entities) => ids.map(id => entities[id]).filter(list => !!list)
    ),
    selectListById: (id: string) => createSelector(
      selectEntities,
      entities => entities[id]
    )
  })
});
