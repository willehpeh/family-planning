import { Entity } from '../../../../common';
import { TodoListItemSnapshot } from './snapshots';
import { TodoListItemId, TodoListItemName, TodoListItemStatus } from '../value-objects';
import { HouseholdId } from '../../../households';

export class TodoListItem implements Entity<TodoListItemSnapshot> {

  private _status: TodoListItemStatus;
  private _dateCompleted: Date | undefined;

  constructor(private readonly _id: TodoListItemId,
              private _name: TodoListItemName,
              private readonly _householdId: HouseholdId) {
    this._status = new TodoListItemStatus('pending');
  }

  snapshot(): TodoListItemSnapshot {
    return new TodoListItemSnapshot(this._id, this._name, this._householdId, this._status, this._dateCompleted);
  }

  static fromSnapshot(snapshot: TodoListItemSnapshot): TodoListItem {
    const item = new TodoListItem(TodoListItemId.fromString(snapshot.id()), new TodoListItemName(snapshot.name()), HouseholdId.fromString(snapshot.householdId()));
    item._status = snapshot.done() ? new TodoListItemStatus('done') : new TodoListItemStatus('pending');
    item._dateCompleted = snapshot.dateCompleted() ? new Date(snapshot.dateCompleted()) : undefined;
    return item;
  }

  hasId(itemId: TodoListItemId) {
    return this._id.equals(itemId);
  }

  markAsDone() {
    if (this._status.equals(new TodoListItemStatus('done'))) {
      throw new Error('Item already completed');
    }
    this._status = new TodoListItemStatus('done');
    this._dateCompleted = new Date();
  }
}
