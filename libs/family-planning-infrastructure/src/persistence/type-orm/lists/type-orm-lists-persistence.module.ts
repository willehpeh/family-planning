import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import { TodoListsRepository } from '@family-planning/domain';
import { OrmTodoListsRepository } from './repositories/orm-todo-lists.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoList,
      TodoListItem
    ])
  ],
  providers: [
    { provide: TodoListsRepository, useClass: OrmTodoListsRepository }
  ],
  exports: [
    TodoListsRepository
  ]
})
export class TypeOrmListsPersistenceModule {}
