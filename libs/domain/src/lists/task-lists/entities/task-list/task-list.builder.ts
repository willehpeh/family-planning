import { TaskList } from './task-list';
import { TaskListId, TaskListName } from '../../value-objects';

export class TaskListBuilder {

  private readonly _id: TaskListId;
  private readonly _name: TaskListName;

  constructor(name: string) {
    this._id = TaskListId.new();
    this._name = new TaskListName(name);
  }

  build(): TaskList {
    return new TaskList(this._id, this._name);
  }
}
