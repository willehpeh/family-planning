import { EntitySnapshot } from '../../../../../common';
import { TodoListItemId, TodoListItemName, TodoListItemStatus } from '../../value-objects';
import { HouseholdId } from '../../../../households';

export class TodoListItemSnapshot implements EntitySnapshot {

  constructor(private readonly _id: TodoListItemId,
              private readonly _name: TodoListItemName,
              private readonly _householdId: HouseholdId,
              private readonly _status: TodoListItemStatus) {}

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }

  householdId(): string {
    return this._householdId.value();
  }

  done(): boolean {
    return this._status.value() === 'done';
  }
}
