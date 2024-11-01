import { TodoListName } from '../value-objects/todo-list-name';
import { TodoListId } from '../value-objects/todo-list-id';
import { TodoListSnapshot } from './snapshots';
import { Entity } from '../../../common';
import { TodoListItem } from './todo-list-item';

export class TodoList implements Entity<TodoListSnapshot> {

  private _items: TodoListItem[] = [];

  constructor(private readonly _id: TodoListId,
              private _name: TodoListName) {
  }

  snapshot(): TodoListSnapshot {
    return new TodoListSnapshot(this._id, this._name, this._items);
  }
}
