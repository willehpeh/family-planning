import { TodoListsCommandRepository } from '@family-planning/domain';
import { AddItemToTodoListCommand } from './add-item-to-todo-list.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AddItemToTodoListCommand)
export class AddItemToTodoListCommandHandler implements ICommandHandler<AddItemToTodoListCommand> {
  constructor(private readonly todoListsRepository: TodoListsCommandRepository) {
  }
  async execute({ listId, itemDetails }: AddItemToTodoListCommand): Promise<void> {
    const list = await this.todoListsRepository.findById(listId);
    list.addNewItem(itemDetails.name);
    return this.todoListsRepository.save(list);
  }
}
