import { EntityAdapter } from '@ngrx/entity';
import { TodoListItemReadModel, TodoListReadModel } from '@family-planning/domain';
import { adapter, ListsState } from './lists.reducer';

export class ListItemsAdapter {

  constructor(private readonly _adapter: EntityAdapter<TodoListReadModel>) {}

  addTemporaryItemToList(listId: string, state: ListsState, temporaryItem: TodoListItemReadModel) {
    return this._adapter.updateOne({
      id: listId,
      changes: {
        items: [...this.itemsCurrentlyInList(state, listId), temporaryItem]
      }
    }, state);
  }

  makeItemPermanent(listId: string, state: ListsState, temporaryItemId: string, createdItem: TodoListItemReadModel) {
    return adapter.updateOne({
      id: listId,
      changes: {
        items: state.entities[listId]?.items.map(listItem =>
          listItem.id === temporaryItemId ? createdItem : listItem
        )
      }
    }, state);
  }

  revertListItems(listId: string, state: ListsState, temporaryItemId: string) {
    return adapter.updateOne({
      id: listId,
      changes: {
        items: this.removeTemporaryItem(state, listId, temporaryItemId)
      }
    }, state);
  }

  markItemAsDone(listId: string, state: ListsState, itemId: string) {
    return adapter.updateOne({
      id: listId,
      changes: {
        items: state.entities[listId]?.items.map(item =>
          item.id === itemId ? { ...item, done: true } : item
        )
      }
    }, state);
  }

  markItemAsPending(listId: string, state: ListsState, itemId: string) {
    return adapter.updateOne({
      id: listId,
      changes: {
        items: state.entities[listId]?.items.map(item =>
          item.id === itemId ? { ...item, done: false } : item
        )
      }
    }, state);
  }

  private removeTemporaryItem(state: ListsState, listId: string, temporaryItemId: string) {
    return state.entities[listId]?.items
      .filter(item => item.id !== temporaryItemId);
  }

  private itemsCurrentlyInList(state: ListsState, listId: string) {
    return state.entities[listId]?.items ?? [];
  }
}
