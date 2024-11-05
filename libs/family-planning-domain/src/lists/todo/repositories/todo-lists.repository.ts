import { TodoList } from '../entities';
import { TodoListReadModel } from '../read-models';

export abstract class TodoListsRepository {
  abstract save(list: TodoList): Promise<void>;
  abstract findById(listId: string): Promise<TodoList>;
  abstract findAll(): Promise<TodoListReadModel[]>;
}
