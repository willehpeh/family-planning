import { List } from "../../entities";
import { CreateTaskProperties, ListId, ListName } from '../../value-objects';
import { TaskListSnapshot } from "./task-list.snapshot";

export class TaskList implements List {
  private readonly _tasks: any[] = [];

  constructor(private _id: ListId,
              private _name: ListName) {}

  snapshot(): TaskListSnapshot {
    return new TaskListSnapshot(this._id.value(), this._name.value(), this._tasks.slice());
  }

  is(other: TaskList): boolean {
    return this._id.equals(other._id);
  }

  addTask(props: CreateTaskProperties): void {
    this._tasks.push(props);
  }
}
