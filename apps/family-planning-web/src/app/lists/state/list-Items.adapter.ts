import { EntityAdapter } from '@ngrx/entity';
import { TodoListItemReadModel, TodoListReadModel } from '@family-planning/domain';
import { ListsState } from './lists.reducer';

export class ListItemsAdapter {

  constructor(private readonly _adapter: EntityAdapter<TodoListReadModel>) {}

  addTemporaryItemToList(listId: string, state: ListsState, temporaryItem: TodoListItemReadModel) {
    const updatedItems = [...this.itemsCurrentlyInList(state, listId), temporaryItem];
    return this.updateListItems(state, listId, updatedItems);
  }

  makeItemPermanent(listId: string, state: ListsState, temporaryItemId: string, createdItem: TodoListItemReadModel) {
    const updatedItems = this.listById(state, listId).items
      .map(listItem => listItem.id === temporaryItemId ?
        createdItem :
        listItem
    );
    return this.updateListItems(state, listId, updatedItems);
  }

  revertListItems(listId: string, state: ListsState, temporaryItemId: string) {
    const revertedItems = this.removeTemporaryItem(state, listId, temporaryItemId);
    return this.updateListItems(state, listId, revertedItems);
  }

  markItemAsDone(listId: string, state: ListsState, itemId: string) {
    const updatedItems = this.listById(state, listId).items
      .map(item => item.id === itemId ?
        { ...item, done: true } :
        item
    );
    return this.updateListItems(state, listId, updatedItems);
  }

  markItemAsPending(listId: string, state: ListsState, itemId: string) {
    const updatedItems = this.listById(state, listId).items
      .map(item => item.id === itemId ?
        { ...item, done: false } :
        item
    );
    return this.updateListItems(state, listId, updatedItems);
  }

  private removeTemporaryItem(state: ListsState, listId: string, temporaryItemId: string) {
    return this.listById(state, listId).items
      .filter(item => item.id !== temporaryItemId);
  }

  private itemsCurrentlyInList(state: ListsState, listId: string) {
    return state.entities[listId]?.items ?? [];
  }

  private updateListItems(state: ListsState, listId: string, items: TodoListItemReadModel[]) {
    return this._adapter.updateOne({
      id: listId,
      changes: { items }
    }, state);
  }

  private listById(state: ListsState, listId: string): TodoListReadModel {
    const list = state.entities[listId];
    if (!list) {
      throw new Error('List not found');
    }
    return list;
  }
}
