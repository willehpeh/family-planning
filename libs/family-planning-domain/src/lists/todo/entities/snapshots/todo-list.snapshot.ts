import { TodoListId } from '../../value-objects/todo-list-id';
import { TodoListName } from '../../value-objects/todo-list-name';

export class TodoListSnapshot {
  constructor(private readonly _id: TodoListId,
              private readonly _name: TodoListName) {}

  id(): string {
    return this._id.value();
  }

  name(): string {
    return this._name.value();
  }
}
