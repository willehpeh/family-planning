import { InMemoryTodoListsCommandRepository } from '../../test-fixtures';
import { MarkItemAsDoneDto } from './mark-item-as-done.dto';
import { MarkItemAsDoneCommand } from './mark-item-as-done.command';
import { MarkItemAsDoneCommandHandler } from './mark-item-as-done.command-handler';

describe('MarkItemAsDoneCommand', () => {
  let command: MarkItemAsDoneCommand;
  let handler: MarkItemAsDoneCommandHandler;
  let dto: MarkItemAsDoneDto;
  let inMemoryTodoListRepository: InMemoryTodoListsCommandRepository;

  beforeEach(() => {
    inMemoryTodoListRepository = new InMemoryTodoListsCommandRepository();
    handler = new MarkItemAsDoneCommandHandler(inMemoryTodoListRepository);
    dto = {};
    command = new MarkItemAsDoneCommand(dto);
  })

  it('should mark the item as done', async () => {
    await handler.execute(command);
    expect(true).toBe(false);
  });
});
