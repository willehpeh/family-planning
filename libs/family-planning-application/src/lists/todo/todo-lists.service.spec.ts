import { TodoListsService } from './todo-lists.service';
import { Test } from '@nestjs/testing';

describe('Todo Lists', () => {
  let todoListsService: TodoListsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TodoListsService],
    }).compile();

    todoListsService = module.get<TodoListsService>(TodoListsService);
  });
});
