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

  findById(listId: string): Promise<TodoList> {
    const found = this._lists.get(listId);
    if (!found) {
      return Promise.reject(new Error(`List with id ${listId} not found`));
    }
    return Promise.resolve(TodoList.fromSnapshot(found));
  }

  totalLists(): number {
    return this._lists.size;
  }

  listSnapshots(): TodoListSnapshot[] {
    return Array.from(this._lists.values());
  }

  withSnapshots(snapshots: TodoListSnapshot[]): InMemoryTodoListsRepository {
    this._lists = new Map(snapshots.map(snapshot => [snapshot.id(), snapshot]));
    return this;
  }

}
