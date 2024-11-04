import { TodoListId, TodoListName } from '../../value-objects';
import { EntitySnapshot } from '../../../../common';
import { TodoListItem } from '../todo-list-item';
import { TodoListItemSnapshot } from './todo-list-item.snapshot';

export class TodoListSnapshot implements EntitySnapshot {

  private readonly _items: TodoListItemSnapshot[] = [];

  constructor(private readonly _id: TodoListId,
              private readonly _name: TodoListName,
              items: TodoListItem[]) {
    this._items = items.map(item => item.snapshot());
  }

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }

  items() {
    return this._items;
  }
}
