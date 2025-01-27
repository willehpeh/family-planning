import { TodoListSnapshot, TodoListsQueryRepository } from '@family-planning/domain';

export class InMemoryTodoListsQueryRepository implements TodoListsQueryRepository {

  private _listsObj: Record<string, TodoListSnapshot> = {};

  findAll(): Promise<{ id: string, name: string, itemIds: string[] }[]> {
    return Promise.resolve(
      Object.values(this._listsObj).map(snapshot => ({
        id: snapshot.id(),
        name: snapshot.name(),
        itemIds: snapshot.itemIds()
      }))
    );
  }

  withSnapshots(snapshots: TodoListSnapshot[]): InMemoryTodoListsQueryRepository {
    snapshots.forEach(snapshot => this._listsObj[snapshot.id()] = snapshot);
    return this;
  }
}
