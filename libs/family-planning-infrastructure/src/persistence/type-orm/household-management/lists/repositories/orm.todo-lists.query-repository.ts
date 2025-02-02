import { Repository } from 'typeorm';
import { RawTodoList, TodoListsQueryRepository } from '@family-planning/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList as TodoListEntity } from '../entities/todo-list.entity';

export class OrmTodoListsQueryRepository implements TodoListsQueryRepository {
  constructor(@InjectRepository(TodoListEntity) private readonly todoListRepository: Repository<TodoListEntity>) {
  }

  async findAll(): Promise<RawTodoList[]> {
    const lists = await this.todoListRepository.find();
    return lists.map(list => ({
      id: list.id,
      name: list.name,
      itemIds: list.itemIds
    }));
  }
}
