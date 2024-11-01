import { TodoList } from '../entities';

export abstract class TodoListsRepository {
  abstract save(list: TodoList): Promise<void>;
  abstract findById(listId: string): Promise<TodoList>;
}
