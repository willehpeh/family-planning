import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateTodoListItemCommand,
  CreateTodoListItemDto, MarkDoneItemAsPendingCommand, MarkDoneItemAsPendingDto,
  MarkItemAsDoneCommand,
  MarkItemAsDoneDto
} from '@family-planning/application';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class ItemsService {

  constructor(private readonly commandBus: CommandBus) {}

  async createTodoListItem(dto: CreateTodoListItemDto): Promise<{ id: string }> {
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
