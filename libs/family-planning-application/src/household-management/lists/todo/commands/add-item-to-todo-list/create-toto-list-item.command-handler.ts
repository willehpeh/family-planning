import { TodoListsCommandRepository } from '@family-planning/domain';
import { CreateTodoListItemCommand } from './create-todo-list-item.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateTodoListItemCommand)
export class CreateTotoListItemCommandHandler implements ICommandHandler<CreateTodoListItemCommand> {
  constructor(private readonly todoListsRepository: TodoListsCommandRepository) {
  }
  async execute({ listId, itemDetails }: CreateTodoListItemCommand): Promise<void> {
    const list = await this.todoListsRepository.findById(listId);
    list.addNewItem(itemDetails.name);
    return this.todoListsRepository.save(list);
  }
}
