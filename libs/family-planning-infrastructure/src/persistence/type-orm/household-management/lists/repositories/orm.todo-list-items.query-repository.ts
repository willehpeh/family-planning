import { TodoListItemReadModel, TodoListItemsQueryRepository } from '@family-planning/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoListItem as TodoListItemEntity } from '../entities/todo-list-item.entity';
import { In, Repository } from 'typeorm';

export class OrmTodoListItemsQueryRepository implements TodoListItemsQueryRepository {
  constructor(@InjectRepository(TodoListItemEntity) private readonly todoListItemsRepository: Repository<TodoListItemEntity>) {}

  async findByListIds(listIds: string[]): Promise<Record<string, TodoListItemReadModel[]>> {
    const items = await this.todoListItemsRepository.find({
      where: {
        listId: In(listIds)
      },
    });
    return listIds.reduce((acc, listId) => ({
      ...acc,
      [listId]: items
        .filter(item => item.listId === listId)
        .map(item => ({
          id: item.id,
          name: item.name,
          done: item.status === 'done'
        }))
    }), {});
  }
}
