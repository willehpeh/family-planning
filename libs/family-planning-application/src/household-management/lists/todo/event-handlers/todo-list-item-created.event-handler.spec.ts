import { TodoListItemCreatedEvent } from '@family-planning/domain';
import { TodoListItemCreatedEventHandler } from './todo-list-item-created.event-handler';
import {
  InMemoryTodoListsCommandRepository,
  TEST_EMPTY_LIST,
  TEST_TODO_LIST_ID,
  TEST_TODO_LIST_ITEM_ID
} from '../test-fixtures';

describe('TodoListItemEventHandler', () => {
  let event: TodoListItemCreatedEvent;
  let handler: TodoListItemCreatedEventHandler;
  let repository: InMemoryTodoListsCommandRepository;

  beforeEach(() => {
    repository = new InMemoryTodoListsCommandRepository().withSnapshots([TEST_EMPTY_LIST()]);
    handler = new TodoListItemCreatedEventHandler(repository);
    event = new TodoListItemCreatedEvent({
      id: TEST_TODO_LIST_ITEM_ID,
      listId: TEST_TODO_LIST_ID
    });
  });

  it('should add the item ID to the list\'s itemIds', async () => {
    await handler.handle(event);
    expect(repository.listSnapshots()[0].itemIds()).toEqual([TEST_TODO_LIST_ITEM_ID.value()]);
  });
});
