import { TodoList, TodoListSnapshot, TodoListsRepository } from '@family-planning/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTodoListsRepository implements TodoListsRepository {

  private _lists = new Map<string, TodoListSnapshot>();

  save(list: TodoList): Promise<void> {
    const snapshot = list.snapshot();
    this._lists.set(snapshot.id(), snapshot);
    return Promise.resolve();
  }

  totalLists(): number {
    return this._lists.size;
  }

  listSnapshots(): TodoListSnapshot[] {
    return Array.from(this._lists.values());
  }

}
