import { TodoList, TodoListsCommandRepository, TodoListSnapshot } from '@family-planning/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTodoListsCommandRepository implements TodoListsCommandRepository {

  private _lists: TodoListSnapshot[] = [];

  async save(list: TodoList): Promise<void> {
    const snapshot = list.snapshot();
    const found = this._lists.find(foundList => foundList.id() === snapshot.id());
    if (!found) {
      this._lists.push(list.snapshot());
      return Promise.resolve();
    }
    this._lists.splice(this._lists.indexOf(found), 1, snapshot);
    await Promise.resolve();
  }

  async findById(listId: string): Promise<TodoList> {
    const found = this._lists.find(list => list.id() === listId);
    if (!found) {
      return Promise.reject(new Error(`List with id ${listId} not found`));
    }
    return Promise.resolve(TodoList.fromSnapshot(found));
  }

  totalLists(): number {
    return this._lists.length;
  }

  listSnapshots(): TodoListSnapshot[] {
    return this._lists.slice();
  }

  getListSnapshotById(listId: string): TodoListSnapshot {
    const found = this.listSnapshots().find(list => list.id() === listId);
    if (!found) {
      throw new Error('List not found');
    }
    return found;
  }

  withSnapshots(snapshots: TodoListSnapshot[]): InMemoryTodoListsCommandRepository {
    this._lists.push(...snapshots);
    return this;
  }

}
