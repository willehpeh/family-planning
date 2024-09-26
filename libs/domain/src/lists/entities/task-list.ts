import { List } from "./";
import { ListId, ListName } from '../value-objects';
import { TaskListSnapshot } from "./task-list.snapshot";

export class TaskList implements List {
  private readonly _items: never[] = [];

  constructor(private _id: ListId,
              private _name: ListName) {}

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  snapshot(): TaskListSnapshot {
    return new TaskListSnapshot(this._id.value(), this._name.value());
  }
}
