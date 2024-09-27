import { TaskList } from './task-list';
import { ListId, ListName } from '../../../value-objects';

export class TaskListBuilder {

  private readonly _id: ListId;
  private readonly _name: ListName;

  constructor(id: string, name: string) {
    this._id = new ListId(id);
    this._name = new ListName(name);
  }

  build(): TaskList {
    return new TaskList(this._id, this._name);
  }
}
