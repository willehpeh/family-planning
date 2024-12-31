import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkItemAsDoneCommand } from './mark-item-as-done.command';
import { InMemoryTodoListsCommandRepository } from '../../test-fixtures';
import { TodoListItemId } from '@family-planning/domain';

@CommandHandler(MarkItemAsDoneCommand)
export class MarkItemAsDoneCommandHandler implements ICommandHandler<MarkItemAsDoneCommand> {
  constructor(private readonly repository: InMemoryTodoListsCommandRepository) {
  }

  async execute(command: MarkItemAsDoneCommand): Promise<void> {
    const list = await this.repository.findById(command.dto.todoListId);
    const itemId = TodoListItemId.fromString(command.dto.itemId);
    list.markItemAsDone(itemId);
    await this.repository.save(list);
  }
}
