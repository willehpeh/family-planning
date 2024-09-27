import { EntitySnapshot } from '../../../../common';
import { TaskSnapshot } from '../task';

export class TaskListSnapshot implements EntitySnapshot {
  constructor(private _id: string,
              private _name: string,
              private _tasks: TaskSnapshot[]) {}

  id(): string {
    return this._id;
  }

  name(): string {
    return this._name;
  }

  tasks(): TaskSnapshot[] {
    return this._tasks.slice();
  }
}
