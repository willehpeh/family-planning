import { TodoListItemSnapshot } from '../entities';

export abstract class TodoListItemsCommandRepository {
  abstract save(snapshot: TodoListItemSnapshot): Promise<void>;
}
