import { CreateTodoListCommandHandler } from './index';
import { InMemoryTodoListsRepository } from '../../test-fixtures';
import { CreateTodoListCommand } from './create-todo-list.command';
import { CreateTodoListDto } from './create-todo-list.dto';

describe('Create todo list', () => {
  let createTodoListCommandHandler: CreateTodoListCommandHandler;
  let inMemoryTodoListsRepository: InMemoryTodoListsRepository;
  let command: CreateTodoListCommand;
  let dto: CreateTodoListDto;

  beforeEach(() => {
    inMemoryTodoListsRepository = new InMemoryTodoListsRepository();
    createTodoListCommandHandler = new CreateTodoListCommandHandler(inMemoryTodoListsRepository);

    dto = { name: 'My List' };
    command = new CreateTodoListCommand(dto);
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
    expect(snapshot.name()).toBe(dto.name);
  });

  it('should create a new list that is empty', () => {
    const snapshot = inMemoryTodoListsRepository.listSnapshots()[0];
    expect(snapshot.items()).toEqual([]);
  });
});
