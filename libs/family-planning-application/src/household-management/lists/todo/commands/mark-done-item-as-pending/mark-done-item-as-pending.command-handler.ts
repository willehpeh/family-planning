import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkDoneItemAsPendingCommand } from './mark-done-item-as-pending.command';
import { TodoListItemId, TodoListsCommandRepository } from '@family-planning/domain';

@CommandHandler(MarkDoneItemAsPendingCommand)
export class MarkDoneItemAsPendingCommandHandler implements ICommandHandler<MarkDoneItemAsPendingCommand> {
  constructor(private readonly repository: TodoListsCommandRepository) {
  }

  async execute(command: MarkDoneItemAsPendingCommand): Promise<void> {
    const list = await this.repository.findById(command.dto.todoListId);
    const itemId = TodoListItemId.fromString(command.dto.itemId);
    try {
      list.markDoneItemAsPending(itemId);
      await this.repository.save(list);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
