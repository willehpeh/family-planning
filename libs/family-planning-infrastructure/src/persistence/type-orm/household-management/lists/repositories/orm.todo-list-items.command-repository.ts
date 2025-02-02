import { TodoListItem, TodoListItemsCommandRepository } from '@family-planning/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoListItem as TodoListItemEntity } from '../entities/todo-list-item.entity';
import { Repository } from 'typeorm';
import { TodoListItemMapper } from '../mappers/todo-list-item.mapper';

export class OrmTodoListItemsCommandRepository implements TodoListItemsCommandRepository {
  constructor(@InjectRepository(TodoListItemEntity) private readonly todoListItemsRepository: Repository<TodoListItemEntity>) {
  }

  async findById(id: string): Promise<TodoListItem> {
    const item = await this.todoListItemsRepository.findOneByOrFail({ id });
    return TodoListItemMapper.toDomain(item);
  }

  async save(item: TodoListItem): Promise<void> {
    const entity = TodoListItemMapper.toPersistence(item);
    await this.todoListItemsRepository.save(entity);
  }

}
