import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllListsQuery } from './find-all-lists.query';
import { TodoListItemsQueryRepository, TodoListReadModel, TodoListsQueryRepository } from '@family-planning/domain';

@QueryHandler(FindAllListsQuery)
export class FindAllListsQueryHandler implements IQueryHandler<FindAllListsQuery> {
  constructor(private readonly todoListsRepository: TodoListsQueryRepository,
              private readonly todoListItemsRepository: TodoListItemsQueryRepository) {
  }

  execute(_: FindAllListsQuery): Promise<TodoListReadModel[]> {
    return this.todoListsRepository.findAll();
  }
}
