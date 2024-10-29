import { TodoListName } from '../value-objects/todo-list-name';
import { TodoListId } from '../value-objects/todo-list-id';
import { TodoListSnapshot } from './snapshots';

export class TodoList {
  constructor(private readonly _id: TodoListId,
              private readonly _name: TodoListName) {
  }

  snapshot(): TodoListSnapshot {
    return new TodoListSnapshot(this._id, this._name);
  }
}
