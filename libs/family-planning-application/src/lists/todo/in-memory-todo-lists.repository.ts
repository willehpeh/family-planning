import { TodoList, TodoListsRepository } from '@family-planning/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTodoListsRepository implements TodoListsRepository {

  private lists = new Map<string, TodoList>();

  save(list: TodoList): Promise<void> {
    this.lists.set(list.name(), list);
    return Promise.resolve();
  }

  totalLists(): number {
    return this.lists.size;
  }

}
