import { Entity } from '../../../../common';
import { TodoListItemSnapshot } from './snapshots';
import { TodoListItemId, TodoListItemName, TodoListItemStatus } from '../value-objects';
import { HouseholdId } from '../../../households';

export class TodoListItem implements Entity<TodoListItemSnapshot> {

  private _status: TodoListItemStatus;

  constructor(private readonly _id: TodoListItemId,
              private _name: TodoListItemName,
              private readonly _householdId: HouseholdId) {
    this._status = new TodoListItemStatus('pending');
  }

  snapshot(): TodoListItemSnapshot {
    return new TodoListItemSnapshot(this._id, this._name, this._householdId, this._status);
  }

  static fromSnapshot(snapshot: TodoListItemSnapshot): TodoListItem {
    return new TodoListItem(TodoListItemId.fromString(snapshot.id()), new TodoListItemName(snapshot.name()), HouseholdId.fromString(snapshot.householdId()));
  }

  hasId(itemId: TodoListItemId) {
    return this._id.equals(itemId);
  }

  markAsDone() {
    this._status = new TodoListItemStatus('done');
  }
}
