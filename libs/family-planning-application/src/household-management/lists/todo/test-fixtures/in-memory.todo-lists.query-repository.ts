import { TodoListReadModel, TodoListSnapshot, TodoListsQueryRepository } from '@family-planning/domain';

export class InMemoryTodoListsQueryRepository implements TodoListsQueryRepository {

  private  _lists = new Map<string, TodoListSnapshot>()

  findAll(): Promise<TodoListReadModel[]> {
    return Promise.resolve(
      Array.from(this._lists.values()).map(snapshot => ({
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
    this._lists = new Map(snapshots.map(snapshot => [snapshot.id(), snapshot]));
    return this;
  }
}
