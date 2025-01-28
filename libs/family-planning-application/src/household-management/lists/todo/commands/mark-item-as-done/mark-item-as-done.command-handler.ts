import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkItemAsDoneCommand } from './mark-item-as-done.command';
import { TodoListItemsCommandRepository } from '@family-planning/domain';

@CommandHandler(MarkItemAsDoneCommand)
export class MarkItemAsDoneCommandHandler implements ICommandHandler<MarkItemAsDoneCommand> {
  constructor(private readonly repository: TodoListItemsCommandRepository) {
  }

  async execute(command: MarkItemAsDoneCommand): Promise<void> {
    const item = await this.repository.findById(command.dto.itemId);
    try {
      item.markAsDone();
      await this.repository.save(item);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
