import { EntitySnapshot } from '../../../../common';
import { TaskStatusString } from '../../value-objects';

export class TaskSnapshot implements EntitySnapshot {
  constructor(private _id: string,
              private _name: string,
              private _status: TaskStatusString,
              private _createdAt: string) {
  }

  id(): string {
    return this._id;
  }

  name(): string {
    return this._name;
  }

  status(): TaskStatusString {
    return this._status;
  }

  createdAt(): string {
    return this._createdAt;
  }
}
