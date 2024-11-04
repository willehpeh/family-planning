import { TodoListId, TodoListItem, TodoListItemName, TodoListName } from '../value-objects';
import { TodoListSnapshot } from './snapshots';
import { Entity } from '../../../common';

export class TodoList implements Entity<TodoListSnapshot> {

  private _items: TodoListItem[] = [];

  constructor(private readonly _id: TodoListId,
              private _name: TodoListName) {
  }

  snapshot(): TodoListSnapshot {
    return new TodoListSnapshot(this._id, this._name, this._items);
  }

  addNewItem(itemName: string): void {
    const item = this.createItem(itemName);
    this._items.push(item);
  }

  private createItem(itemName: string): TodoListItem {
    const name = new TodoListItemName(itemName);
    return new TodoListItem(name);
  }

  static fromSnapshot(snapshot: TodoListSnapshot): TodoList {
    const list = new TodoList(TodoListId.fromString(snapshot.id()), new TodoListName(snapshot.name()));
    list._items = snapshot.todos()
      .map(serializedItem => new TodoListItem(new TodoListItemName(serializedItem.name)));
    return list;
  }
}
