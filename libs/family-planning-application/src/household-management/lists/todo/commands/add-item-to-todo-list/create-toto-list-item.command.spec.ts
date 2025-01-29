import { EMPTY_TODO_LIST_SNAPSHOT, InMemoryTodoListsCommandRepository } from '../../test-fixtures';
import { CreateTodoListItemCommand, CreateTotoListItemCommandHandler } from '.';
import { CreateTotoListItemDto } from './create-toto-list-item.dto';

describe('Add item to todo list', () => {
  let addItemToTodoListCommandHandler: CreateTotoListItemCommandHandler;
  let inMemoryTodoListsRepository: InMemoryTodoListsCommandRepository;
  let command: CreateTodoListItemCommand;
  let dto: CreateTotoListItemDto;

  describe('Given I add one item', () => {
    beforeEach(() => {
      inMemoryTodoListsRepository = new InMemoryTodoListsCommandRepository().withSnapshots([EMPTY_TODO_LIST_SNAPSHOT]);
      addItemToTodoListCommandHandler = new CreateTotoListItemCommandHandler(inMemoryTodoListsRepository);

      dto = {
        listId: EMPTY_TODO_LIST_SNAPSHOT.id(),
        itemDetails: {
          name: 'first item'
        }
      };
      command = new CreateTodoListItemCommand(dto);
      addItemToTodoListCommandHandler.execute(command);
    });

    it('should add one item to the todo list', () => {
      const listSnapshot = inMemoryTodoListsRepository.listSnapshots()[0];
      expect(listSnapshot.itemIds().length).toBe(1);
    });
  });

  describe('Given I add two items', () => {

    let secondDto: CreateTotoListItemDto;
    let secondCommand: CreateTodoListItemCommand;

    beforeEach(async () => {
      inMemoryTodoListsRepository = new InMemoryTodoListsCommandRepository().withSnapshots([EMPTY_TODO_LIST_SNAPSHOT]);
      addItemToTodoListCommandHandler = new CreateTotoListItemCommandHandler(inMemoryTodoListsRepository);

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
      command = new CreateTodoListItemCommand(dto);
      secondCommand = new CreateTodoListItemCommand(secondDto);
      await addItemToTodoListCommandHandler.execute(command);
      await addItemToTodoListCommandHandler.execute(secondCommand);
    });

    it('should add two items to the todo list', () => {
      const listSnapshot = inMemoryTodoListsRepository.listSnapshots()[0];
      expect(listSnapshot.itemIds().length).toBe(2);
    });

  });

});
