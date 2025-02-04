import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { NullTodoListReadModel } from '../models/null-todo-list.read-model';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import {
  CreateList,
  CreateListFailure,
  CreateListItem,
  CreateListItemFailure,
  CreateListItemSuccess,
  CreateListSuccess,
  LoadAllLists,
  LoadAllListsFailure,
  LoadAllListsFromDetailView,
  LoadAllListsSuccess,
  MarkDoneItemAsPending,
  MarkDoneItemAsPendingFailure,
  MarkItemAsDone,
  MarkItemAsDoneFailure,
  ToggleDisplayCompletedItems
} from './lists.actions';
import { TodoListReadModel } from '@family-planning/domain';
import { ListItemsAdapter } from './list-Items.adapter';

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

const listItemsAdapter = new ListItemsAdapter(adapter);

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
    on(CreateListSuccess, (state, { list }) => adapter.addOne(list, { ...state, saving: false })),
    on(CreateListFailure, state => ({ ...state, saving: false })),
    on(CreateListItem, (state, { listId, temporaryItem }) => listItemsAdapter.addTemporaryItemToList(listId, state, temporaryItem)),
    on(CreateListItemSuccess, (state, { listId, temporaryItemId, createdItem }) => listItemsAdapter.makeItemPermanent(listId, state, temporaryItemId, createdItem)),
    on(CreateListItemFailure, (state, { listId, temporaryItemId }) => listItemsAdapter.revertListItems(listId, state, temporaryItemId)),
    on(MarkItemAsDone, MarkDoneItemAsPendingFailure, (state, { listId, itemId }): ListsState => listItemsAdapter.markItemAsDone(listId, state, itemId)),
    on(MarkItemAsDoneFailure, MarkDoneItemAsPending, (state, { listId, itemId }): ListsState => listItemsAdapter.markItemAsPending(listId, state, itemId)),
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
