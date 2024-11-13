import { TodoListId, TodoListName } from '../../value-objects';
import { EntitySnapshot } from '../../../../../common';
import { TodoListItemSnapshot } from './todo-list-item.snapshot';

export class TodoListSnapshot implements EntitySnapshot {

  constructor(private readonly _id: TodoListId,
              private readonly _name: TodoListName,
              private readonly _items: TodoListItemSnapshot[]) {
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
