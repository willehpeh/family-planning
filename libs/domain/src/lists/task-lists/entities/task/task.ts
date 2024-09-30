import { Entity } from '../../../../common';
import { TaskSnapshot } from './task.snapshot';
import { TaskCreatedAt, TaskId, TaskName, TaskStatus } from '../../value-objects';


export class Task implements Entity {
  private readonly _id: TaskId;
  private _name: TaskName;
  private _status: TaskStatus;
  private _createdAt: TaskCreatedAt;

  constructor(id: TaskId, name: TaskName) {
    this._id = id;
    this._name = name;
    this._status = new TaskStatus('pending');
    this._createdAt = new TaskCreatedAt();
  }

  snapshot(): TaskSnapshot {
    return new TaskSnapshot(
      this._id.value(),
      this._name.value(),
      this._status.value(),
      this._createdAt.value()
    );
  }

  is(other: Task): boolean {
    return this._id.equals(other._id);
  }

  static fromSnapshot(snapshot: TaskSnapshot): Task {
    const taskId = TaskId.fromString(snapshot.id());
    const taskName = new TaskName(snapshot.name());
    const taskStatus = new TaskStatus(snapshot.status());
    const taskCreatedAt = new TaskCreatedAt(snapshot.createdAt());
    const task = new Task(taskId, taskName);
    task._status = taskStatus;
    task._createdAt = taskCreatedAt;
    return task;
  }
}
