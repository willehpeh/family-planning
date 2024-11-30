import { Entity } from '../../../../common';
import { TodoListItemSnapshot } from './snapshots';
import { TodoListItemId, TodoListItemName } from '../value-objects';
import { HouseholdId } from '../../../households';

export class TodoListItem implements Entity<TodoListItemSnapshot> {

  constructor(private readonly _id: TodoListItemId,
              private _name: TodoListItemName,
              private readonly _householdId: HouseholdId) {
  }

  snapshot(): TodoListItemSnapshot {
    return new TodoListItemSnapshot(this._id, this._name, this._householdId);
  }

  static fromSnapshot(snapshot: TodoListItemSnapshot): TodoListItem {
    return new TodoListItem(TodoListItemId.fromString(snapshot.id()), new TodoListItemName(snapshot.name()), HouseholdId.fromString(snapshot.householdId()));
  }
}
