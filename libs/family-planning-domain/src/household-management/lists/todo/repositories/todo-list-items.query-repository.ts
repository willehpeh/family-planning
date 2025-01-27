import { TodoListItemReadModel } from "../read-models";
import { TodoListItemId } from "../value-objects";

export abstract class TodoListItemsQueryRepository {
  abstract findByIds(ids: TodoListItemId[]): Promise<TodoListItemReadModel[]>;
}
