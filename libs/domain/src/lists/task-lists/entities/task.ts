import { Entity } from '../../../common';
import { TaskSnapshot } from './task-snapshot';
import { TaskId, TaskName } from '../../value-objects';

export class Task implements Entity {
  private _id: TaskId;
  private _name: TaskName;

  constructor(id: TaskId, name: TaskName) {
    this._id = id;
    this._name = name;
  }

  snapshot(): TaskSnapshot {
    return new TaskSnapshot(this._id.value(), this._name.value());
  }
}
