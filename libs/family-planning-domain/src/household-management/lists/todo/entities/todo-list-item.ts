import { Entity } from '../../../../common';
import { TodoListItemSnapshot } from './snapshots';
import { TodoListId, TodoListItemId, TodoListItemName, TodoListItemStatus } from '../value-objects';
import { HouseholdId } from '../../../households';

export class TodoListItem implements Entity<TodoListItemSnapshot> {

  private _status: TodoListItemStatus;
  private _dateCompleted: Date | undefined;

  constructor(private readonly _id: TodoListItemId,
              private _name: TodoListItemName,
              private readonly _householdId: HouseholdId,
              private readonly _listId: TodoListId) {
    this._status = new TodoListItemStatus('pending');
  }

  static fromSnapshot(snapshot: TodoListItemSnapshot): TodoListItem {
    const item = new TodoListItem(TodoListItemId.fromString(snapshot.id()), new TodoListItemName(snapshot.name()), HouseholdId.fromString(snapshot.householdId()), TodoListId.fromString(snapshot.listId()));
    item._status = snapshot.done() ? new TodoListItemStatus('done') : new TodoListItemStatus('pending');
    item._dateCompleted = snapshot.dateCompleted() ?? undefined;
    return item;
  }

  snapshot(): TodoListItemSnapshot {
    return new TodoListItemSnapshot({
      id: this._id,
      name: this._name,
      householdId: this._householdId,
      status: this._status,
      dateCompleted: this._dateCompleted ?? null,
      listId: this._listId
    });
  }

  hasId(itemId: TodoListItemId) {
    return this._id.equals(itemId);
  }

  markAsDone() {
    if (this.alreadyDone()) {
      throw new Error('Item already completed');
    }
    this.setDoneStatusAndCompletionDate();
  }

  markAsPending() {
    if (this.alreadyPending()) {
      throw new Error('Item already pending');
    }
    this.setPendingStatus();
    this.clearCompletionDate();
  }

  private setDoneStatusAndCompletionDate() {
    this._status = new TodoListItemStatus('done');
    this._dateCompleted = new Date();
  }

  private alreadyDone() {
    return this._status.equals(new TodoListItemStatus('done'));
  }

  private alreadyPending() {
    return this._status.equals(new TodoListItemStatus('pending'));
  }

  private setPendingStatus() {
    this._status = new TodoListItemStatus('pending');
  }

  private clearCompletionDate() {
    this._dateCompleted = undefined;
  }
}
