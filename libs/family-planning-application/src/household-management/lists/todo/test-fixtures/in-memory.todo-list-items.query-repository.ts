import { TodoListItemReadModel, TodoListItemSnapshot, TodoListItemsQueryRepository } from '@family-planning/domain';

export class InMemoryTodoListItemsQueryRepository implements TodoListItemsQueryRepository {

  private _items: TodoListItemSnapshot[] = [];

  findByListIds(ids: string[]): Promise<{ [listId: string]: TodoListItemReadModel[] }> {
    return Promise.resolve(ids.reduce((acc, id) => {
      return {
        ...acc,
        [id]: this._items.filter(item => item.listId() === id)
      }
    }, {}));
  }

  withSnapshots(snapshots: TodoListItemSnapshot[]): InMemoryTodoListItemsQueryRepository {
    this._items = snapshots;
    return this;
  }
}
