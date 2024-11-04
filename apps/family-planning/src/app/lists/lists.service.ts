import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoListCommand, CreateTodoListDto } from '@family-planning/application';

@Injectable()
export class ListsService {
  constructor(private readonly commandBus: CommandBus) {}

  async createTodoList(dto: CreateTodoListDto) {
    return this.commandBus.execute(new CreateTodoListCommand(dto));
  }
}
