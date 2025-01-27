import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllListsQuery } from './find-all-lists.query';
import { TodoListItemsQueryRepository, TodoListReadModel, TodoListsQueryRepository } from '@family-planning/domain';

@QueryHandler(FindAllListsQuery)
export class FindAllListsQueryHandler implements IQueryHandler<FindAllListsQuery> {
  constructor(private readonly todoListsRepository: TodoListsQueryRepository,
              private readonly todoListItemsRepository: TodoListItemsQueryRepository) {
  }

  async execute(_: FindAllListsQuery): Promise<TodoListReadModel[]> {
    const lists = await this.todoListsRepository.findAll();
    const listIds = lists.map(list => list.id);
    const items = await this.todoListItemsRepository.findByListIds(listIds);
    return lists.map(list => ({
      id: list.id,
      name: list.name,
      items: items[list.id] ?? []
    }));
  }
}
