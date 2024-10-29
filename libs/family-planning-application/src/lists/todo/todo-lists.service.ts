import { Injectable } from '@nestjs/common';
import { TodoList, TodoListsRepository } from '@family-planning/domain';

@Injectable()
export class TodoListsService {
  constructor(private readonly todoListsRepository: TodoListsRepository) {
  }

  async createNewList(listName: string): Promise<void> {
    const list = new TodoList(listName);
    return this.todoListsRepository.save(list);
  }
}
