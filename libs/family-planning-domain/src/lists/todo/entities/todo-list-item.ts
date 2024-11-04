import { Entity } from '../../../common';
import { TodoListItemSnapshot } from './snapshots';
import { TodoListItemId, TodoListItemName } from '../value-objects';

export class TodoListItem implements Entity<TodoListItemSnapshot> {

  constructor(private readonly _id: TodoListItemId,
              private _name: TodoListItemName) {
  }

  snapshot(): TodoListItemSnapshot {
    return new TodoListItemSnapshot(this._id, this._name);
  }

  static fromSnapshot(snapshot: TodoListItemSnapshot): TodoListItem {
    return new TodoListItem(TodoListItemId.fromString(snapshot.id()), new TodoListItemName(snapshot.name()));
  }
}
