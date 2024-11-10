import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { SerializedTodoList } from '../models/serialized-todo-list';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import {
  AddItemToList,
  AddItemToListFailure,
  CreateList,
  CreateListFailure,
  CreateListSuccess,
  LoadAllLists,
  LoadAllListsFailure,
  LoadAllListsSuccess
} from './lists.actions';

export const featureKey = 'lists';

export interface ListsState extends EntityState<SerializedTodoList>{
  loading: boolean;
  saving: boolean;
}

export const adapter = createEntityAdapter<SerializedTodoList>({
  selectId: list => list.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const initialState: ListsState = adapter.getInitialState({
  loading: false,
  saving: false,
});

export const listsFeature = createFeature({
  name: featureKey,
  reducer: createReducer(
    initialState,
    on(LoadAllLists, state => ({ ...state, loading: true })),
    on(LoadAllListsSuccess, (state, { lists }) => adapter.upsertMany(lists, { ...state, loading: false })),
    on(LoadAllListsFailure, state => ({ ...state, loading: false })),
    on(CreateList, state => ({ ...state, saving: true })),
    on(CreateListSuccess, state => ({ ...state, saving: false })),
    on(CreateListFailure, state => ({ ...state, saving: false })),
    on(AddItemToList, (state, { listId, temporaryItem }) => {
      const previousListItems = state.entities[listId]?.items ?? [];
      return adapter.updateOne({
        id: listId,
        changes: {
          items: [...previousListItems, temporaryItem]
        }
      }, state);
    }),
    on(AddItemToListFailure, (state, { listId, transactionId }) => {
      const revertedListItems = state.entities[listId]?.items
        .filter(item => item.id !== transactionId);
      return adapter.updateOne({
        id: listId,
        changes: {
          items: revertedListItems
        }
      }, state);
    })
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
    ),
  })
});
