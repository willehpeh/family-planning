import { TodoListId, TodoListItemId, TodoListName } from '../value-objects';
import { TodoListSnapshot } from './snapshots';
import { Entity } from '../../../../common';
import { HouseholdId } from '../../../households';

export class TodoList implements Entity<TodoListSnapshot> {

  private _itemIds: TodoListItemId[] = [];

  constructor(private readonly _id: TodoListId,
              private _name: TodoListName,
              private readonly householdId: HouseholdId) {
  }

  static fromSnapshot(snapshot: TodoListSnapshot): TodoList {
    const list = new TodoList(TodoListId.fromString(snapshot.id()), new TodoListName(snapshot.name()), HouseholdId.fromString(snapshot.householdId()));
    list._itemIds = snapshot.itemIds().map(id => TodoListItemId.fromString(id));
    return list;
  }

  snapshot(): TodoListSnapshot {
    return new TodoListSnapshot({
      id: this._id,
      name: this._name,
      itemIds: this._itemIds,
      householdId: this.householdId
    });
  }

  addItem(itemId: TodoListItemId): void {
    this._itemIds.push(itemId);
  }
}
