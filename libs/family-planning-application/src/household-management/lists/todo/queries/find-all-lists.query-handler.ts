import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllListsQuery } from './find-all-lists.query';
import { TodoListReadModel, TodoListsQueryRepository } from '@family-planning/domain';

@QueryHandler(FindAllListsQuery)
export class FindAllListsQueryHandler implements IQueryHandler<FindAllListsQuery> {
  constructor(private readonly todoListsRepository: TodoListsQueryRepository) {
  }

  async execute(query: FindAllListsQuery): Promise<TodoListReadModel[]> {
    return await this.todoListsRepository.findAll();
  }
}
