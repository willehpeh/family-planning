import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllListsQuery } from './find-all-lists.query';
import { TodoListReadModel, TodoListsQueryRepository } from '@family-planning/domain';

@QueryHandler(FindAllListsQuery)
export class FindAllListsQueryHandler implements IQueryHandler<FindAllListsQuery> {
  constructor(private readonly todoListsRepository: TodoListsQueryRepository) {
  }

  execute(_: FindAllListsQuery): Promise<TodoListReadModel[]> {
    return this.todoListsRepository.findAll();
  }
}
