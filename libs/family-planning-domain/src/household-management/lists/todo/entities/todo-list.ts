import { TodoListId, TodoListItemId, TodoListName } from '../value-objects';
import { TodoListSnapshot } from './snapshots';
import { Entity } from '../../../../common';
import { HouseholdId } from '../../../households';

export class TodoList implements Entity<TodoListSnapshot> {

  private _itemIds: TodoListItemId[] = [];

  private constructor(private readonly _id: TodoListId,
                      private _name: TodoListName,
                      private readonly householdId: HouseholdId) {
  }

  static fromSnapshot(snapshot: TodoListSnapshot): TodoList {
    const list = new TodoList(TodoListId.fromString(snapshot.id()), new TodoListName(snapshot.name()), HouseholdId.fromString(snapshot.householdId()));
    list._itemIds = snapshot.itemIds().map(id => TodoListItemId.fromString(id));
    return list;
  }

  static new(name: TodoListName, householdId: HouseholdId): TodoList {
    return new TodoList(TodoListId.new(), name, householdId);
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
    if (this._itemIds.find(id => id.equals(itemId))) {
      throw new Error('Item already exists');
    }
    this._itemIds.push(itemId);
  }
}
