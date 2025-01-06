import { TodoListReadModel, TodoListSnapshot, TodoListsQueryRepository } from '@family-planning/domain';

export class InMemoryTodoListsQueryRepository implements TodoListsQueryRepository {

  private _listsObj: Record<string, TodoListSnapshot> = {};

  findAll(): Promise<TodoListReadModel[]> {
    return Promise.resolve(
      Object.values(this._listsObj).map(snapshot => ({
        id: snapshot.id(),
        name: snapshot.name(),
        items: snapshot.items().map(item => ({
          id: item.id(),
          name: item.name(),
          done: item.done(),
        }))
      }))
    );
  }

  withSnapshots(snapshots: TodoListSnapshot[]): InMemoryTodoListsQueryRepository {
    snapshots.forEach(snapshot => this._listsObj[snapshot.id()] = snapshot);
    return this;
  }
}
