import { EMPTY_TODO_LIST_SNAPSHOT, InMemoryTodoListsCommandRepository } from '../../test-fixtures';
import { AddItemToTodoListCommand, AddItemToTodoListCommandHandler } from '.';
import { AddItemToTodoListDto } from './add-item-to-todo-list.dto';

describe('Add item to todo list', () => {
  let addItemToTodoListCommandHandler: AddItemToTodoListCommandHandler;
  let inMemoryTodoListsRepository: InMemoryTodoListsCommandRepository;
  let command: AddItemToTodoListCommand;
  let dto: AddItemToTodoListDto;

  describe('Given I add one item', () => {
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
      expect(listSnapshot.itemIds().length).toBe(1);
    });
  });

  describe('Given I add two items', () => {

    let secondDto: AddItemToTodoListDto;
    let secondCommand: AddItemToTodoListCommand;

    beforeEach(async () => {
      inMemoryTodoListsRepository = new InMemoryTodoListsCommandRepository().withSnapshots([EMPTY_TODO_LIST_SNAPSHOT]);
      addItemToTodoListCommandHandler = new AddItemToTodoListCommandHandler(inMemoryTodoListsRepository);

      dto = {
        listId: EMPTY_TODO_LIST_SNAPSHOT.id(),
        itemDetails: {
          name: 'first item'
        }
      };

      secondDto = {
        listId: EMPTY_TODO_LIST_SNAPSHOT.id(),
        itemDetails: {
          name: 'second item'
        }
      };
      command = new AddItemToTodoListCommand(dto);
      secondCommand = new AddItemToTodoListCommand(secondDto);
      await addItemToTodoListCommandHandler.execute(command);
      await addItemToTodoListCommandHandler.execute(secondCommand);
    });

    it('should add two items to the todo list', () => {
      const listSnapshot = inMemoryTodoListsRepository.listSnapshots()[0];
      expect(listSnapshot.itemIds().length).toBe(2);
    });

  });

});
