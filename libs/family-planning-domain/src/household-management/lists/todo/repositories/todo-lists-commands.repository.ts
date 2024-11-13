import { TodoList } from '../entities';

export abstract class TodoListsCommandsRepository {
  abstract save(list: TodoList): Promise<void>;
  abstract findById(listId: string): Promise<TodoList>;
}
