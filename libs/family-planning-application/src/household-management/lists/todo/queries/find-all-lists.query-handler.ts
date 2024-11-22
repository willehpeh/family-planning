import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllListsQuery } from './find-all-lists.query';
import { TodoListReadModel, TodoListsQueriesRepository } from '@family-planning/domain';

@QueryHandler(FindAllListsQuery)
export class FindAllListsQueryHandler implements IQueryHandler<FindAllListsQuery> {
  constructor(private readonly todoListsRepository: TodoListsQueriesRepository) {
  }

  async execute(query: FindAllListsQuery): Promise<TodoListReadModel[]> {
    return await this.todoListsRepository.findAll();
  }
}
