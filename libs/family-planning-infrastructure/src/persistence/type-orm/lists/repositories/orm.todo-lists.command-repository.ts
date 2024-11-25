import { TodoList as TodoListEntity } from '../entities/todo-list.entity';
import { TodoList, TodoListsCommandRepository } from '@family-planning/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoListMapper } from '../mappers/todo-list.mapper';

export class OrmTodoListsCommandRepository implements TodoListsCommandRepository {
  constructor(@InjectRepository(TodoListEntity) private readonly todoListRepository: Repository<TodoListEntity>) {
  }

  async save(todoList: TodoList): Promise<void> {
    const entity = TodoListMapper.toPersistence(todoList);
    await this.todoListRepository.save(entity);
    return;
  }

  async findById(id: string): Promise<TodoList> {
    const entity = await this.todoListRepository.findOneByOrFail({ id });
    return TodoListMapper.toDomain(entity);
  }
}
