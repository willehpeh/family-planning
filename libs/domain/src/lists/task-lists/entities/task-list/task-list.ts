import { TaskListSnapshot } from './task-list.snapshot';
import { CreateTaskProperties, Task } from '../task';
import { Entity } from '../../../../common';
import { TaskListId, TaskListName, TaskName } from '../../value-objects';

export class TaskList implements Entity {
  private _tasks: Task[] = [];

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
    const taskName = new TaskName(props.name);
    return Task.new(taskName);
  }

  static fromSnapshot(snapshot: TaskListSnapshot): TaskList {
    const taskListId = TaskListId.fromString(snapshot.id());
    const taskListName = new TaskListName(snapshot.name());
    const taskList = new TaskList(taskListId, taskListName);
    taskList._tasks = snapshot.tasks()
      .map((taskSnapshot) => Task.fromSnapshot(taskSnapshot));
    return taskList;
  }
}
