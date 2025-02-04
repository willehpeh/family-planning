import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTodoListItemCommand,
  CreateTodoListItemDto,
  CreateTodoListCommand,
  CreateTodoListDto,
  FindAllListsQuery,
  MarkDoneItemAsPendingCommand,
  MarkDoneItemAsPendingDto,
  MarkItemAsDoneCommand,
  MarkItemAsDoneDto
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

  async createTodoList(dto: CreateTodoListDto, householdId: string): Promise<{ id: string }> {
    return this.commandBus.execute(new CreateTodoListCommand(dto, householdId));
  }

  async addItemToTodoList(dto: CreateTodoListItemDto): Promise<void> {
    return this.commandBus.execute(new CreateTodoListItemCommand(dto));
  }

  async markItemAsDone(dto: MarkItemAsDoneDto): Promise<void> {
    try {
      await this.commandBus.execute(new MarkItemAsDoneCommand(dto));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async markDoneItemAsPending(dto: MarkDoneItemAsPendingDto) {
    try {
      await this.commandBus.execute(new MarkDoneItemAsPendingCommand(dto));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
