import { RawTodoList } from '../read-models';

export abstract class TodoListsQueryRepository {
  abstract findAll(): Promise<RawTodoList[]>;
}
