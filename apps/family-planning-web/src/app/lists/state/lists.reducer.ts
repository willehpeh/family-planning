import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { NullTodoListReadModel } from '../models/serialized-todo-list';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import {
  AddItemToList,
  AddItemToListFailure,
  CreateList,
  CreateListFailure,
  CreateListSuccess,
  LoadAllLists,
  LoadAllListsFailure,
  LoadAllListsFromDetailView,
  LoadAllListsSuccess, MarkDoneItemAsPending, MarkDoneItemAsPendingFailure,
  MarkItemAsDone,
  MarkItemAsDoneFailure, ToggleDisplayCompletedItems
} from './lists.actions';
import { TodoListReadModel } from '@family-planning/domain';

export const featureKey = 'lists';

export interface ListsState extends EntityState<TodoListReadModel> {
  loading: boolean;
  saving: boolean;
  displayCompleted: boolean;
}

export const adapter = createEntityAdapter<TodoListReadModel>({
  selectId: list => list.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const initialState: ListsState = adapter.getInitialState({
  loading: false,
  saving: false,
  displayCompleted: false
});

export const listsFeature = createFeature({
  name: featureKey,
  reducer: createReducer(
    initialState,
    on(LoadAllLists, LoadAllListsFromDetailView, state => ({ ...state, loading: true })),
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
    }),
    on(MarkItemAsDone, MarkDoneItemAsPendingFailure, (state, { listId, itemId }): ListsState => adapter.updateOne({
      id: listId,
      changes: {
        items: state.entities[listId]?.items.map(item =>
          item.id === itemId ? { ...item, done: true } : item
        )
      }
    }, state)),
    on(MarkItemAsDoneFailure, MarkDoneItemAsPending, (state, { listId, itemId }): ListsState => adapter.updateOne({
      id: listId,
      changes: {
        items: state.entities[listId]?.items.map(item =>
          item.id === itemId ? { ...item, done: false } : item
        )
      }
    }, state)),
    on(ToggleDisplayCompletedItems, state => ({ ...state, displayCompleted: !state.displayCompleted }))
  ),
  extraSelectors: ({ selectIds, selectEntities }) => ({
    selectAllLists: createSelector(
      selectIds,
      selectEntities,
      (ids, entities) => ids.map(id => entities[id]).filter(list => !!list)
    ),
    selectListById: (id: string) => createSelector(
      selectEntities,
      entities => entities[id] ?? NullTodoListReadModel
    ),
  })
});
