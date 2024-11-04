import { ValueObject } from '../../../common';
import { TodoListItemName } from './index';
import { SerializedTodoListItem } from './serialized/todo-list-item.serialized';

export class TodoListItem implements ValueObject<SerializedTodoListItem> {

  constructor(private readonly _name: TodoListItemName) {
  }

  value(): SerializedTodoListItem {
    return {
      name: this._name.value()
    };
  }

  equals(other: TodoListItem): boolean {
    return this._name === other._name;
  }

}
