import { EMPTY_TODO_LIST_SNAPSHOT, TEST_HOUSEHOLD_ID } from '../../test-fixtures';
import { CreateTodoListItemCommand, CreateTodoListItemCommandHandler } from '.';
import { CreateTodoListItemDto } from './create-todo-list-item.dto';
import {
  InMemoryTodoListItemsCommandRepository
} from '../../test-fixtures/in-memory.todo-list-items.command-repository';
import { TodoListItemSnapshot } from '@family-planning/domain';

describe('Add item to todo list', () => {
  let createTodoListItemCommandHandler: CreateTodoListItemCommandHandler;
  let inMemoryTodoListItemsRepository: InMemoryTodoListItemsCommandRepository;
  let command: CreateTodoListItemCommand;
  let dto: CreateTodoListItemDto;

  describe('Given I add one item', () => {
    beforeEach(() => {
      inMemoryTodoListItemsRepository = new InMemoryTodoListItemsCommandRepository();
      createTodoListItemCommandHandler = new CreateTodoListItemCommandHandler(inMemoryTodoListItemsRepository);

      dto = {
        listId: EMPTY_TODO_LIST_SNAPSHOT.id(),
        householdId: TEST_HOUSEHOLD_ID.value(),
        itemDetails: {
          name: 'first item'
        }
      };
      command = new CreateTodoListItemCommand(dto);
      createTodoListItemCommandHandler.execute(command);
    });

    it('should create exactly one item', () => {
      expect(inMemoryTodoListItemsRepository.itemsArray().length).toBe(1);
    });

    describe('Item details', () => {

      let itemSnapshot: TodoListItemSnapshot;

      beforeEach(() => {
        itemSnapshot = inMemoryTodoListItemsRepository.itemsArray()[0].snapshot();
      });

      it('should have the right name', () => {
        expect(itemSnapshot.name()).toBe(dto.itemDetails.name);
      });

      it('should have the right household ID', () => {
        expect(itemSnapshot.householdId()).toBe(TEST_HOUSEHOLD_ID.value());
      });

      it('should have the right list ID', () => {
        expect(itemSnapshot.listId()).toBe(dto.listId);
      })
    });
  });

});
