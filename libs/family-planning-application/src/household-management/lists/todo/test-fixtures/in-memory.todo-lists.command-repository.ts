import { TodoList, TodoListsCommandRepository, TodoListSnapshot } from '@family-planning/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTodoListsCommandRepository implements TodoListsCommandRepository {

  private _lists: Record<string, TodoListSnapshot> = {};

  async save(list: TodoList): Promise<void> {
    this._lists[list.snapshot().id()] = list.snapshot();
    return Promise.resolve();
  }

  async findById(listId: string): Promise<TodoList> {
    const snapshot = this._lists[listId];
    if (!snapshot) {
      return Promise.reject(`Todo list with id ${listId} not found`);
    }
    return Promise.resolve(TodoList.fromSnapshot(snapshot));
  }

  totalLists(): number {
    return Object.keys(this._lists).length;
  }

  listSnapshots(): TodoListSnapshot[] {
    return Object.values(this._lists);
  }

  withSnapshots(snapshots: TodoListSnapshot[]): InMemoryTodoListsCommandRepository {
    snapshots.forEach(snapshot => this._lists[snapshot.id()] = snapshot);
    return this;
  }

}
