import { TodoListItem } from '../entities';

export abstract class TodoListItemsCommandRepository {
  abstract save(snapshot: TodoListItem): Promise<void>;
  abstract findById(id: string): Promise<TodoListItem>;
}
