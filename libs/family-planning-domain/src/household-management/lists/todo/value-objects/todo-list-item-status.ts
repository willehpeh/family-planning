import { ValueObject } from '../../../../common';

type TodoListItemStatusString = 'pending' | 'done';

export class TodoListItemStatus implements ValueObject<string> {

  constructor(private readonly _status: TodoListItemStatusString) {
  }

  equals(other: TodoListItemStatus): boolean {
    return this._status === other._status;
  }

  value(): TodoListItemStatusString {
    return this._status;
  }

}
