import { TodoListsService } from './todo-lists.service';
import { InMemoryTodoListsRepository } from './in-memory-todo-lists.repository';

describe('Todo Lists', () => {
  let todoListsService: TodoListsService;
  let inMemoryTodoListsRepository: InMemoryTodoListsRepository;

  beforeEach(() => {
    inMemoryTodoListsRepository = new InMemoryTodoListsRepository();
    todoListsService = new TodoListsService(inMemoryTodoListsRepository);
  });

  describe('List creation', () => {
    it('should create a new list', () => {
      todoListsService.createNewList('My List');
      expect(inMemoryTodoListsRepository.totalLists()).toBe(1);
    });
  })
});
