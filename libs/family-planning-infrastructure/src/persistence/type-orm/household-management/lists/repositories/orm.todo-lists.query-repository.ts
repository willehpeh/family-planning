import { Repository } from 'typeorm';
import { TodoListReadModel, TodoListsQueryRepository } from '@family-planning/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList as TodoListEntity } from '../entities/todo-list.entity';

export class OrmTodoListsQueryRepository implements TodoListsQueryRepository {
  constructor(@InjectRepository(TodoListEntity) private readonly todoListRepository: Repository<TodoListEntity>) {
  }

  async findAll(): Promise<TodoListReadModel[]> {
    const lists = await this.todoListRepository.find();
    return lists.map(list => ({
      id: list.id,
      name: list.name,
      items: list.items.map(item => ({
        id: item.id,
        name: item.name,
        done: item.status === 'done',
      }))
    }));
  }
}
