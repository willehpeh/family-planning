import { TodoListReadModel } from '../read-models';

export abstract class TodoListsQueriesRepository {
  abstract findAll(): Promise<TodoListReadModel[]>;
}
