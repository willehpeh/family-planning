import { EntitySnapshot } from '../../../../../common';
import { TodoListId, TodoListItemId, TodoListItemName, TodoListItemStatus } from '../../value-objects';
import { HouseholdId } from '../../../../households';

export class TodoListItemSnapshot implements EntitySnapshot {

  private readonly _id: TodoListItemId;
  private readonly _name: TodoListItemName;
  private readonly _householdId: HouseholdId;
  private readonly _status: TodoListItemStatus;
  private readonly _dateCompleted?: Date;
  private readonly _listId: TodoListId;

  constructor(snapshot: {
    id: TodoListItemId,
    name: TodoListItemName,
    householdId: HouseholdId,
    status: TodoListItemStatus,
    dateCompleted: Date | null,
    listId: TodoListId
  }) {
    this._id = snapshot.id;
    this._name = snapshot.name;
    this._householdId = snapshot.householdId;
    this._status = snapshot.status;
    this._dateCompleted = snapshot.dateCompleted ?? undefined;
    this._listId = snapshot.listId;
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

  dateCompleted(): Date | null {
    if (!this._dateCompleted) {
      return null;
    }
    return this._dateCompleted;
  }

  pending() {
    return this._status.value() === 'pending';
  }

  listId(): string {
    return this._listId.value();
  }
}
