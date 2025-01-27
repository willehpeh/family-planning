import { TodoListItemId, TodoListItemReadModel, TodoListItemsQueryRepository } from '@family-planning/domain';

export class InMemoryTodoListItemsQueryRepository implements TodoListItemsQueryRepository {
  findByIds(ids: TodoListItemId[]): Promise<TodoListItemReadModel[]> {
    return Promise.resolve([]);
  }
}
