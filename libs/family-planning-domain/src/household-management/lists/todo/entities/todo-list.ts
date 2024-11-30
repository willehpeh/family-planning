import { TodoListId, TodoListItemId, TodoListItemName, TodoListName } from '../value-objects';
import { TodoListSnapshot } from './snapshots';
import { Entity } from '../../../../common';
import { TodoListItem } from './todo-list-item';
import { HouseholdId } from '../../../households';

export class TodoList implements Entity<TodoListSnapshot> {

  private _items: TodoListItem[] = [];

  constructor(private readonly _id: TodoListId,
              private _name: TodoListName,
              private readonly householdId: HouseholdId) {
  }

  snapshot(): TodoListSnapshot {
    return new TodoListSnapshot(this._id, this._name, this._items.map(item => item.snapshot()), this.householdId);
  }

  addNewItem(itemName: string): void {
    const item = this.createItem(itemName);
    this._items.push(item);
  }

  private createItem(itemName: string): TodoListItem {
    const id = TodoListItemId.new();
    const name = new TodoListItemName(itemName);
    return new TodoListItem(id, name);
  }

  static fromSnapshot(snapshot: TodoListSnapshot): TodoList {
    const list = new TodoList(TodoListId.fromString(snapshot.id()), new TodoListName(snapshot.name()), HouseholdId.fromString(snapshot.householdId()));
    list._items = snapshot.items().map(itemSnapshot => TodoListItem.fromSnapshot(itemSnapshot));
    return list;
  }
}
