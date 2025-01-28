import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkDoneItemAsPendingCommand } from './mark-done-item-as-pending.command';
import { TodoListItemsCommandRepository } from '@family-planning/domain';

@CommandHandler(MarkDoneItemAsPendingCommand)
export class MarkDoneItemAsPendingCommandHandler implements ICommandHandler<MarkDoneItemAsPendingCommand> {
  constructor(private readonly repository: TodoListItemsCommandRepository) {
  }

  async execute(command: MarkDoneItemAsPendingCommand): Promise<void> {
    const item = await this.repository.findById(command.dto.itemId);
    try {
      item.markAsPending();
      await this.repository.save(item);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
