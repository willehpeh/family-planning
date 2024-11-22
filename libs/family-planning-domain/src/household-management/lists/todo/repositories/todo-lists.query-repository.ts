import { TodoListReadModel } from '../read-models';

export abstract class TodoListsQueryRepository {
  abstract findAll(): Promise<TodoListReadModel[]>;
}
