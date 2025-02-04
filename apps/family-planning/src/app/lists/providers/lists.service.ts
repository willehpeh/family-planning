import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand, CreateTodoListDto, FindAllListsQuery } from '@family-planning/application';
import { TodoListReadModel } from '@family-planning/domain';

@Injectable()
export class ListsService {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  async findAllLists(): Promise<TodoListReadModel[]> {
    return this.queryBus.execute(new FindAllListsQuery());
  }

  async createTodoList(dto: CreateTodoListDto, householdId: string): Promise<{ id: string }> {
    return this.commandBus.execute(new CreateTodoListCommand(dto, householdId));
  }
}
