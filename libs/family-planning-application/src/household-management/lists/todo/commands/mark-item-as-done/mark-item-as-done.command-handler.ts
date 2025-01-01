import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkItemAsDoneCommand } from './mark-item-as-done.command';
import { TodoListItemId, TodoListsCommandRepository } from '@family-planning/domain';

@CommandHandler(MarkItemAsDoneCommand)
export class MarkItemAsDoneCommandHandler implements ICommandHandler<MarkItemAsDoneCommand> {
  constructor(private readonly repository: TodoListsCommandRepository) {
  }

  async execute(command: MarkItemAsDoneCommand): Promise<void> {
    const list = await this.repository.findById(command.dto.todoListId);
    const itemId = TodoListItemId.fromString(command.dto.itemId);
    try {
      list.markItemAsDone(itemId);
      await this.repository.save(list);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
