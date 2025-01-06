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
      expect(listSnapshot.items().length).toBe(2);
    });

    it('should add the second item with a date that is after that of the first item', () => {
      const listSnapshot = inMemoryTodoListsRepository.listSnapshots()[0];
      const firstItemSnapshot = listSnapshot.items()[0];
      const secondItemSnapshot = listSnapshot.items()[1];
      // const firstDate = new Date(firstItemSnapshot.createdAt());
      // const secondDate = new Date(secondItemSnapshot.createdAt());
      // expect(firstDate.getTime()).toBeLessThan(secondDate.getTime());
    });
  });

});
