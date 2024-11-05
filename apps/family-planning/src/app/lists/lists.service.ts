import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddItemToTodoListCommand, AddItemToTodoListDto, CreateTodoListCommand, CreateTodoListDto } from '@family-planning/application';

@Injectable()
export class ListsService {
  constructor(private readonly commandBus: CommandBus) {}

  async createTodoList(dto: CreateTodoListDto) {
    return this.commandBus.execute(new CreateTodoListCommand(dto));
  }

  async addItemToTodoList(dto: AddItemToTodoListDto) {
    return this.commandBus.execute(new AddItemToTodoListCommand(dto));
  }
}
