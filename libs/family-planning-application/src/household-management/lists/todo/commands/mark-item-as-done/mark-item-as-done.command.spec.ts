import { TEST_PENDING_TODO_LIST_ITEM, TEST_TODO_LIST_ID, TEST_TODO_LIST_ITEM_ID } from '../../test-fixtures';
import { MarkItemAsDoneCommand, MarkItemAsDoneCommandHandler, MarkItemAsDoneDto } from './';
import { DateString } from '@family-planning/domain';
import {
  InMemoryTodoListItemsCommandRepository
} from '../../test-fixtures/in-memory.todo-list-items.command-repository';

describe('MarkItemAsDoneCommand', () => {
  let command: MarkItemAsDoneCommand;
  let handler: MarkItemAsDoneCommandHandler;
  let dto: MarkItemAsDoneDto;
  let repository: InMemoryTodoListItemsCommandRepository;

  beforeEach(() => {
    repository = new InMemoryTodoListItemsCommandRepository().withItems([TEST_PENDING_TODO_LIST_ITEM()]);
    handler = new MarkItemAsDoneCommandHandler(repository);
    dto = {
      todoListId: TEST_TODO_LIST_ID.value(),
      itemId: TEST_TODO_LIST_ITEM_ID.value(),
    }
    command = new MarkItemAsDoneCommand(dto);
  });

  describe('Given the item exists and is not done', () => {

    it('should mark the item as done', async () => {
      await handler.execute(command);
      const item = repository.items[TEST_TODO_LIST_ITEM_ID.value()];
      expect(item.snapshot().done()).toBe(true);
    });

    it('should mark the item as done today', async () => {
      await handler.execute(command);
      const item = repository.items[TEST_TODO_LIST_ITEM_ID.value()];
      expect(new DateString(item.snapshot().dateCompleted()!).equals(DateString.now())).toBe(true);
    });
  });

  describe('Given the item exists and is already done', () => {

    beforeEach(async () => {
      await handler.execute(command);
    });

    it('should throw an error', async () => {
      await expect(handler.execute(command)).rejects.toThrow(new Error('Item already completed'));
    });
  });
});
