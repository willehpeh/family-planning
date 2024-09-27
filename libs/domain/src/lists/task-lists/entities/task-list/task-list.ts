import { TaskListSnapshot } from './task-list.snapshot';
import { CreateTaskProperties, Task } from '../task';
import { Entity } from '../../../../common';
import { TaskId, TaskListId, TaskListName, TaskName } from '../../value-objects';

export class TaskList implements Entity {
  private readonly _tasks: Task[] = [];

  constructor(private _id: TaskListId, private _name: TaskListName) {}

  snapshot(): TaskListSnapshot {
    return new TaskListSnapshot(
      this._id.value(),
      this._name.value(),
      this._tasks.map((task) => task.snapshot())
    );
  }

  is(other: TaskList): boolean {
    return this._id.equals(other._id);
  }

  addTask(props: CreateTaskProperties): void {
    const task = this.createTask(props);
    this._tasks.push(task);
  }

  private createTask(props: CreateTaskProperties): Task {
    const taskId = new TaskId(props.id);
    const taskName = new TaskName(props.name);
    return new Task(taskId, taskName);
  }
}
