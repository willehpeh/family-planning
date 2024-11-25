import { TodoListReadModel, TodoListSnapshot, TodoListsQueryRepository } from '@family-planning/domain';

export class InMemoryTodoListsQueryRepository implements TodoListsQueryRepository {

  private  _lists = new Map<string, TodoListSnapshot>()

  findAll(): Promise<TodoListReadModel[]> {
    return Promise.resolve(
      Array.from(this._lists.values()).map(snapshot => new TodoListReadModel(snapshot))
    );
  }

  withSnapshots(snapshots: TodoListSnapshot[]): InMemoryTodoListsQueryRepository {
    this._lists = new Map(snapshots.map(snapshot => [snapshot.id(), snapshot]));
    return this;
  }
}
