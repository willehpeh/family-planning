import {
  InMemoryTodoListsCommandRepository, TEST_HOUSEHOLD_ID,
  TEST_TODO_LIST_ID, TEST_TODO_LIST_ITEM_ID,
  TODO_LIST_WITH_TWO_ITEMS_SNAPSHOT
} from '../../test-fixtures';
import { MarkItemAsDoneDto } from './mark-item-as-done.dto';
import { MarkItemAsDoneCommand } from './mark-item-as-done.command';
import { MarkItemAsDoneCommandHandler } from './mark-item-as-done.command-handler';

describe('MarkItemAsDoneCommand', () => {
  let command: MarkItemAsDoneCommand;
  let handler: MarkItemAsDoneCommandHandler;
  let dto: MarkItemAsDoneDto;
  let inMemoryTodoListRepository: InMemoryTodoListsCommandRepository;

  beforeEach(() => {
    inMemoryTodoListRepository = new InMemoryTodoListsCommandRepository().withSnapshots([TODO_LIST_WITH_TWO_ITEMS_SNAPSHOT]);
    handler = new MarkItemAsDoneCommandHandler(inMemoryTodoListRepository);
    dto = {
      todoListId: TEST_TODO_LIST_ID.value(),
      itemId: TEST_TODO_LIST_ITEM_ID.value(),
      householdId: TEST_HOUSEHOLD_ID.value(),
    }
    command = new MarkItemAsDoneCommand(dto);
  })

  it('should mark the item as done', async () => {
    await handler.execute(command);
    const list = await inMemoryTodoListRepository.findById(TEST_TODO_LIST_ID.value());
    const itemSnapshot = list.snapshot().items().find(item => item.id() === TEST_TODO_LIST_ITEM_ID.value());
    expect(itemSnapshot?.done()).toBe(true);
  });
});
