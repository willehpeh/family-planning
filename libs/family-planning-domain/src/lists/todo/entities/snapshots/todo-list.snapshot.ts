import { TodoListId, TodoListItem, TodoListName } from '../../value-objects';
import { EntitySnapshot } from '../../../../common';
import { SerializedTodoListItem } from '../../value-objects/serialized/todo-list-item.serialized';

export class TodoListSnapshot implements EntitySnapshot {

  private readonly _items: SerializedTodoListItem[] = [];

  constructor(private readonly _id: TodoListId,
              private readonly _name: TodoListName,
              items: TodoListItem[]) {
    this._items = items.map(item => item.value());
  }

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }

  todos() {
    return this._items;
  }
}
