import { EMPTY_TODO_LIST_SNAPSHOT, InMemoryTodoListsCommandRepository } from '../../test-fixtures';
import { AddItemToTodoListCommand, AddItemToTodoListCommandHandler } from '.';
import { AddItemToTodoListDto } from './add-item-to-todo-list.dto';

describe('Add item to todo list', () => {
  let addItemToTodoListCommandHandler: AddItemToTodoListCommandHandler;
  let inMemoryTodoListsRepository: InMemoryTodoListsCommandRepository;
  let command: AddItemToTodoListCommand;
  let dto: AddItemToTodoListDto;

  beforeEach(() => {
    inMemoryTodoListsRepository = new InMemoryTodoListsCommandRepository().withSnapshots([EMPTY_TODO_LIST_SNAPSHOT]);
    addItemToTodoListCommandHandler = new AddItemToTodoListCommandHandler(inMemoryTodoListsRepository);

    dto = {
      listId: EMPTY_TODO_LIST_SNAPSHOT.id(),
      itemDetails: {
        name: 'first item'
      }
    };
    command = new AddItemToTodoListCommand(dto);
    addItemToTodoListCommandHandler.execute(command);
  });

  it('should add one item to the todo list', () => {
    const listSnapshot = inMemoryTodoListsRepository.listSnapshots()[0];
    expect(listSnapshot.items().length).toBe(1);
  });

  it('should add the item with the provided name', () => {
    const listSnapshot = inMemoryTodoListsRepository.listSnapshots()[0];
    const itemSnapshot = listSnapshot.items()[0];
    expect(itemSnapshot.name()).toBe(dto.itemDetails.name);
  });

  it('should add the item with a status of pending', () => {
    const listSnapshot = inMemoryTodoListsRepository.listSnapshots()[0];
    const itemSnapshot = listSnapshot.items()[0];
    expect(itemSnapshot.pending()).toBe(true);
  });
});
