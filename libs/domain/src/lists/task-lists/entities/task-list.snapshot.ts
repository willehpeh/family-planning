import { EntitySnapshot } from '../../../common';

export class TaskListSnapshot implements EntitySnapshot {
  constructor(private _id: string,
              private _name: string,
              private _tasks: any[]) {
  }

  id(): string {
    return this._id;
  }

  name(): string {
    return this._name;
  }

  tasks(): any[] {
    return this._tasks.slice();
  }
}
