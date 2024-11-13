import { TodoList } from '../entities';
import { TodoListId, TodoListName } from '../value-objects';

export class TodoListFactory {
  createEmptyList(name: string): TodoList {
    const newId = TodoListId.new();
    const todoListName = new TodoListName(name);
    return new TodoList(newId, todoListName);
  }
}
