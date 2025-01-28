import { TEST_TODO_LIST_ID, TEST_DONE_TODO_LIST_ITEM, TEST_TODO_LIST_ITEM_ID } from '../../test-fixtures';
import { MarkDoneItemAsPendingCommand, MarkDoneItemAsPendingCommandHandler, MarkDoneItemAsPendingDto } from './';
import {
  InMemoryTodoListItemsCommandRepository
} from '../../test-fixtures/in-memory.todo-list-items.command-repository';

describe('MarkDoneItemAsPendingCommand', () => {
  let command: MarkDoneItemAsPendingCommand;
  let commandHandler: MarkDoneItemAsPendingCommandHandler;
  let repository: InMemoryTodoListItemsCommandRepository;
  let dto: MarkDoneItemAsPendingDto;

  beforeEach(() => {
    repository = new InMemoryTodoListItemsCommandRepository().withItems([TEST_DONE_TODO_LIST_ITEM()]);
    commandHandler = new MarkDoneItemAsPendingCommandHandler(repository);
    dto = {
      itemId: TEST_TODO_LIST_ITEM_ID.value(),
      todoListId: TEST_TODO_LIST_ID.value()
    };
    command = new MarkDoneItemAsPendingCommand(dto);
  });

  it('should mark the item as pending', async () => {
    await commandHandler.execute(command);
    const item = repository.items[TEST_TODO_LIST_ITEM_ID.value()];
    expect(item.snapshot().done()).toBe(false);
  });
});
