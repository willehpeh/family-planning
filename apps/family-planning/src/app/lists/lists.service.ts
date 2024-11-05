import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddItemToTodoListCommand,
  AddItemToTodoListDto,
  CreateTodoListCommand,
  CreateTodoListDto,
  FindAllListsQuery
} from '@family-planning/application';
import { TodoListReadModel } from '@family-planning/domain';

@Injectable()
export class ListsService {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  async findAllLists(): Promise<TodoListReadModel[]> {
    return this.queryBus.execute(new FindAllListsQuery());
  }

  async createTodoList(dto: CreateTodoListDto): Promise<void> {
    return this.commandBus.execute(new CreateTodoListCommand(dto));
  }

  async addItemToTodoList(dto: AddItemToTodoListDto): Promise<void> {
    return this.commandBus.execute(new AddItemToTodoListCommand(dto));
  }
}
