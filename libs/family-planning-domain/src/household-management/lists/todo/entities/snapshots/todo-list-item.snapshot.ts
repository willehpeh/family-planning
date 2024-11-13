import { EntitySnapshot } from '../../../../../common';
import { TodoListItemId, TodoListItemName } from '../../value-objects';

export class TodoListItemSnapshot implements EntitySnapshot {

  constructor(private readonly _id: TodoListItemId,
              private readonly _name: TodoListItemName) {
  }

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }
}
