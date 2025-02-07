import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { NullTodoListReadModel } from '../models/null-todo-list.read-model';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as ListActions from './lists.actions';
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
    on(ListActions.LoadAllLists, ListActions.LoadAllListsFromDetailView, state => ({ ...state, loading: true })),
    on(ListActions.LoadAllListsSuccess, (state, { lists }) => adapter.upsertMany(lists, { ...state, loading: false })),
    on(ListActions.LoadAllListsFailure, state => ({ ...state, loading: false })),
    on(ListActions.CreateList, state => ({ ...state, saving: true })),
    on(ListActions.CreateListSuccess, (state, { list }) => adapter.addOne(list, { ...state, saving: false })),
    on(ListActions.CreateListFailure, state => ({ ...state, saving: false })),
    on(ListActions.CreateListItem, (state, { listId, temporaryItem }) => listItemsAdapter.addTemporaryItemToList(listId, state, temporaryItem)),
    on(ListActions.CreateListItemSuccess, (state, { listId, temporaryItemId, createdItem }) => listItemsAdapter.makeItemPermanent(listId, state, temporaryItemId, createdItem)),
    on(ListActions.CreateListItemFailure, (state, { listId, temporaryItemId }) => listItemsAdapter.revertListItems(listId, state, temporaryItemId)),
    on(ListActions.MarkItemAsDone, ListActions.MarkDoneItemAsPendingFailure, (state, { listId, itemId }): ListsState => listItemsAdapter.markItemAsDone(listId, state, itemId)),
    on(ListActions.MarkItemAsDoneFailure, ListActions.MarkDoneItemAsPending, (state, { listId, itemId }): ListsState => listItemsAdapter.markItemAsPending(listId, state, itemId)),
    on(ListActions.ToggleDisplayCompletedItems, state => ({ ...state, displayCompleted: !state.displayCompleted }))
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
