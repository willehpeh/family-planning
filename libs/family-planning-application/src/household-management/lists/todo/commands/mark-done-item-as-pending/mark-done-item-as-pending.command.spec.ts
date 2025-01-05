import {
  InMemoryTodoListsCommandRepository,
  TEST_TODO_LIST_ID,
  TEST_TODO_LIST_ITEM_ID,
  TODO_LIST_WITH_ONE_COMPLETED_ITEM_SNAPSHOT
} from '../../test-fixtures';
import { MarkDoneItemAsPendingCommand, MarkDoneItemAsPendingCommandHandler, MarkDoneItemAsPendingDto } from './';
import { TodoListItemSnapshot, TodoListSnapshot } from '@family-planning/domain';

describe('MarkDoneItemAsPendingCommand', () => {
  let command: MarkDoneItemAsPendingCommand;
  let commandHandler: MarkDoneItemAsPendingCommandHandler;
  let repository: InMemoryTodoListsCommandRepository;
  let dto: MarkDoneItemAsPendingDto;

  let listSnapshot: TodoListSnapshot;
  let itemSnapshot: TodoListItemSnapshot | undefined;

  beforeEach(() => {
    repository = new InMemoryTodoListsCommandRepository().withSnapshots([TODO_LIST_WITH_ONE_COMPLETED_ITEM_SNAPSHOT]);
    commandHandler = new MarkDoneItemAsPendingCommandHandler(repository);
    dto = {
      itemId: TEST_TODO_LIST_ITEM_ID.value(),
      todoListId: TEST_TODO_LIST_ID.value()
    };
    command = new MarkDoneItemAsPendingCommand(dto);
  });

  it('should mark the item as pending', async () => {
    await commandHandler.execute(command);
    listSnapshot = repository.getListSnapshotById(TEST_TODO_LIST_ID.value());
    itemSnapshot = listSnapshot.items().find(item => item.id() === TEST_TODO_LIST_ITEM_ID.value());
    expect(itemSnapshot?.done()).toBe(false);
  });
});
