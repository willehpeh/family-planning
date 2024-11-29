import { Repository } from 'typeorm';
import { TodoListReadModel, TodoListsQueryRepository } from '@family-planning/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList as TodoListEntity } from '../entities/todo-list.entity';

export class OrmTodoListsQueryRepository implements TodoListsQueryRepository {
  constructor(@InjectRepository(TodoListEntity) private readonly todoListRepository: Repository<TodoListEntity>) {
  }

  findAll(): Promise<TodoListReadModel[]> {
    return this.todoListRepository.find();
  }
}
