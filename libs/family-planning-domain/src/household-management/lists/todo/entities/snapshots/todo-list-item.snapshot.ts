import { EntitySnapshot } from '../../../../../common';
import { TodoListItemId, TodoListItemName, TodoListItemStatus } from '../../value-objects';
import { HouseholdId } from '../../../../households';

export class TodoListItemSnapshot implements EntitySnapshot {

  private readonly _id: TodoListItemId;
  private readonly _name: TodoListItemName;
  private readonly _householdId: HouseholdId;
  private readonly _status: TodoListItemStatus;
  private readonly _dateCompleted?: Date;

  constructor(snapshot: {
    id: TodoListItemId,
    name: TodoListItemName,
    householdId: HouseholdId,
    status: TodoListItemStatus,
    dateCompleted?: Date
  }) {
    this._id = snapshot.id;
    this._name = snapshot.name;
    this._householdId = snapshot.householdId;
    this._status = snapshot.status;
    this._dateCompleted = snapshot.dateCompleted ?? undefined;
  }

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

  status(): 'pending' | 'done' {
    return this._status.value();
  }

  dateCompleted(): Date {
    if (!this._dateCompleted) {
      throw new Error('Item not completed');
    }
    return this._dateCompleted;
  }

  pending() {
    return this._status.value() === 'pending';
  }
}
