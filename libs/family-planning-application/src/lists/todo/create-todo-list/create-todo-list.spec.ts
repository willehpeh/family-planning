import { CreateTodoListCommandHandler } from '.';
import { InMemoryTodoListsRepository } from '../in-memory-todo-lists.repository';
import { CreateTodoListCommand } from './create-todo-list.command';

describe('Todo list creation', () => {
  let createTodoListCommandHandler: CreateTodoListCommandHandler;
  let inMemoryTodoListsRepository: InMemoryTodoListsRepository;

  beforeEach(() => {
    inMemoryTodoListsRepository = new InMemoryTodoListsRepository();
    createTodoListCommandHandler = new CreateTodoListCommandHandler(inMemoryTodoListsRepository);
  });

  it('should create a new list', () => {
    const command = new CreateTodoListCommand('My List');
    createTodoListCommandHandler.execute(command);
    expect(inMemoryTodoListsRepository.totalLists()).toBe(1);
  });
});
