import { TodoListsRepository } from '@family-planning/domain';
import { AddItemToTodoListCommand } from './add-item-to-todo-list.command';
import { ICommandHandler } from '@nestjs/cqrs';

export class AddItemToTodoListCommandHandler implements ICommandHandler<AddItemToTodoListCommand> {
  constructor(private readonly todoListsRepository: TodoListsRepository) {
  }
  async execute({ listId, itemDetails }: AddItemToTodoListCommand): Promise<void> {
    const list = await this.todoListsRepository.findById(listId);
    list.addNewItem(itemDetails.name);
    return this.todoListsRepository.save(list);
  }
}
