import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkItemAsDoneCommand } from './mark-item-as-done.command';
import { InMemoryTodoListsCommandRepository } from '../../test-fixtures';

@CommandHandler(MarkItemAsDoneCommand)
export class MarkItemAsDoneCommandHandler implements ICommandHandler<MarkItemAsDoneCommand> {
  constructor(private readonly repository: InMemoryTodoListsCommandRepository) {
  }

  execute(command: MarkItemAsDoneCommand): Promise<void> {
    return Promise.resolve();
  }
}
