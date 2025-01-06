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
    return Promise.resolve(TodoList.fromSnapshot(this._lists[listId]));
  }

  totalLists(): number {
    return Object.keys(this._lists).length;
  }

  listSnapshots(): TodoListSnapshot[] {
    return Object.values(this._lists);
  }

  getListSnapshotById(listId: string): TodoListSnapshot {
    return this._lists[listId];
  }

  withSnapshots(snapshots: TodoListSnapshot[]): InMemoryTodoListsCommandRepository {
    snapshots.forEach(snapshot => this._lists[snapshot.id()] = snapshot);
    return this;
  }

}
