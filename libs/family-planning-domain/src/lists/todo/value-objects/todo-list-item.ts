import { ValueObject } from '../../../common';
import { TodoListItemName } from './index';

export class TodoListItem implements ValueObject<{ name: string }> {

  constructor(private readonly _name: TodoListItemName) {
  }

  value(): { name: string } {
    return {
      name: this._name.value()
    };
  }

  equals(other: TodoListItem): boolean {
    return this._name === other._name;
  }

}
