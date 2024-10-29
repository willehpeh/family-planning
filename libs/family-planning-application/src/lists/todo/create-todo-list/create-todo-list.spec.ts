import { CreateTodoListCommandHandler } from '.';
import { InMemoryTodoListsRepository } from '../in-memory-todo-lists.repository';
import { CreateTodoListCommand } from './create-todo-list.command';

describe('Todo list creation', () => {
  let createTodoListCommandHandler: CreateTodoListCommandHandler;
  let inMemoryTodoListsRepository: InMemoryTodoListsRepository;
  let command: CreateTodoListCommand;

  beforeEach(() => {
    inMemoryTodoListsRepository = new InMemoryTodoListsRepository();
    createTodoListCommandHandler = new CreateTodoListCommandHandler(inMemoryTodoListsRepository);

    command = new CreateTodoListCommand({ name: 'My List' });
    createTodoListCommandHandler.execute(command);
  });

  it('should create a new list', () => {
    expect(inMemoryTodoListsRepository.totalLists()).toBe(1);
  });

  it('should create a new list with an id of the form TODOLIST:[uuid]', () => {
    const snapshot = inMemoryTodoListsRepository.listSnapshots()[0];
    expect(snapshot.id()).toMatch(/^TODOLIST:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it('should create a new list with the provided name', () => {
    const snapshot = inMemoryTodoListsRepository.listSnapshots()[0];
    expect(snapshot.name()).toBe(command.name);
  });
});
