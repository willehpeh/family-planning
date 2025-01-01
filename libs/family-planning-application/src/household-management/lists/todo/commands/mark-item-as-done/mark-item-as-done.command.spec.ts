import {
  InMemoryTodoListsCommandRepository,
  TEST_TODO_LIST_ID,
  TEST_TODO_LIST_ITEM_ID,
  TODO_LIST_WITH_TWO_ITEMS_SNAPSHOT
} from '../../test-fixtures';
import { MarkItemAsDoneDto } from './mark-item-as-done.dto';
import { MarkItemAsDoneCommand } from './mark-item-as-done.command';
import { MarkItemAsDoneCommandHandler } from './mark-item-as-done.command-handler';
import { DateString, TodoListItemSnapshot, TodoListSnapshot } from '@family-planning/domain';

function getItemSnapshotById(listSnapshot: TodoListSnapshot, itemId: string) {
  return listSnapshot?.items().find(item => item.id() === itemId);
}

describe('MarkItemAsDoneCommand', () => {
  let command: MarkItemAsDoneCommand;
  let handler: MarkItemAsDoneCommandHandler;
  let dto: MarkItemAsDoneDto;
  let inMemoryTodoListRepository: InMemoryTodoListsCommandRepository;

  let listSnapshot: TodoListSnapshot;
  let itemSnapshot: TodoListItemSnapshot | undefined;

  beforeEach(() => {
    inMemoryTodoListRepository = new InMemoryTodoListsCommandRepository().withSnapshots([TODO_LIST_WITH_TWO_ITEMS_SNAPSHOT]);
    handler = new MarkItemAsDoneCommandHandler(inMemoryTodoListRepository);
    dto = {
      todoListId: TEST_TODO_LIST_ID.value(),
      itemId: TEST_TODO_LIST_ITEM_ID.value(),
    }
    command = new MarkItemAsDoneCommand(dto);
  });

  describe('Given the item exists and is not done', () => {

    it('should mark the item as done', async () => {
      await handler.execute(command);
      listSnapshot = inMemoryTodoListRepository.getListSnapshotById(TEST_TODO_LIST_ID.value());
      itemSnapshot = getItemSnapshotById(listSnapshot, TEST_TODO_LIST_ITEM_ID.value())!;
      expect(itemSnapshot.done()).toBe(true);
    });

    it('should mark the item as done today', async () => {
      await handler.execute(command);
      listSnapshot = inMemoryTodoListRepository.getListSnapshotById(TEST_TODO_LIST_ID.value());
      itemSnapshot = getItemSnapshotById(listSnapshot, TEST_TODO_LIST_ITEM_ID.value())!;
      expect(new DateString(itemSnapshot.dateCompleted()).equals(DateString.now())).toBe(true);
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
