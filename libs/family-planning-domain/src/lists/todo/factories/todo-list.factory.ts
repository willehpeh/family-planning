import { TodoList } from '../entities';
import { TodoListName } from '../value-objects/todo-list-name';
import { TodoListId } from '../value-objects/todo-list-id';

export class TodoListFactory {
  createEmptyList(name: string): TodoList {
    const newId = TodoListId.new();
    const todoListName = new TodoListName(name);
    return new TodoList(newId, todoListName);
  }
}
