import { TEST_HOUSEHOLD_ID, TEST_TODO_LIST_ID } from '../../test-fixtures';
import { CreateTodoListItemCommand, CreateTodoListItemCommandHandler } from '.';
import { CreateTodoListItemDto } from './create-todo-list-item.dto';
import {
  InMemoryTodoListItemsCommandRepository
} from '../../test-fixtures/in-memory.todo-list-items.command-repository';
import { TodoListItemCreatedEvent, TodoListItemSnapshot } from '@family-planning/domain';
import { FakeEventBus } from '../../../../../shared';

describe('Create todo list item', () => {
  let createTodoListItemCommandHandler: CreateTodoListItemCommandHandler;
  let inMemoryTodoListItemsRepository: InMemoryTodoListItemsCommandRepository;
  let command: CreateTodoListItemCommand;
  let dto: CreateTodoListItemDto;
  let fakeEventBus: FakeEventBus;

  describe('Given I add one item', () => {
    beforeEach(() => {
      fakeEventBus = new FakeEventBus();
      inMemoryTodoListItemsRepository = new InMemoryTodoListItemsCommandRepository();
      createTodoListItemCommandHandler = new CreateTodoListItemCommandHandler(inMemoryTodoListItemsRepository, fakeEventBus);

      dto = {
        listId: TEST_TODO_LIST_ID.value(),
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

    it('should raise a TodoListItemCreated event', () => {
      expect(fakeEventBus.events.filter(event => event.eventName() === 'TodoListItemCreated').length).toBe(1);
    });

    it('should raise an event with the correct list ID', () => {
      expect((fakeEventBus.events[0] as TodoListItemCreatedEvent).listId.equals(TEST_TODO_LIST_ID)).toBe(true);
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
