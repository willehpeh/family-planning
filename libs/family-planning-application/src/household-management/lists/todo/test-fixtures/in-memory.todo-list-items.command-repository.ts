import { TodoListItemsCommandRepository, TodoListItemSnapshot } from '@family-planning/domain';

export class InMemoryTodoListItemsCommandRepository implements TodoListItemsCommandRepository {
  save(snapshot: TodoListItemSnapshot): Promise<void> {
    return Promise.resolve(undefined);
  }
}
