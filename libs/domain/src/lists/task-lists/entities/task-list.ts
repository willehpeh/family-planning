import { List } from "../../entities";
import { ListId, ListName } from '../../value-objects';
import { TaskListSnapshot } from "./task-list.snapshot";

export class TaskList implements List {
  private readonly _items: never[] = [];

  constructor(private _id: ListId,
              private _name: ListName) {}

  snapshot(): TaskListSnapshot {
    return new TaskListSnapshot(this._id.value(), this._name.value(), this._items.slice());
  }

  is(other: TaskList): boolean {
    return this._id.equals(other._id);
  }
}
