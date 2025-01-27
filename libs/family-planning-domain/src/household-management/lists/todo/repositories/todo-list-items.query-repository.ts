import { TodoListItemReadModel } from '../read-models';

export abstract class TodoListItemsQueryRepository {
  abstract findByListIds(ids: string[]): Promise<{ [listId: string]: TodoListItemReadModel[] }>;
}
