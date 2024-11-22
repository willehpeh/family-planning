import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import { TodoListsCommandRepository, TodoListsQueryRepository } from '@family-planning/domain';
import { OrmTodoListsCommandRepository } from './repositories/orm-todo-lists.command-repository';
import { OrmTodoListsQueryRepository } from './repositories/orm-todo-lists.query-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoList,
      TodoListItem
    ])
  ],
  providers: [
    { provide: TodoListsCommandRepository, useClass: OrmTodoListsCommandRepository },
    { provide: TodoListsQueryRepository, useClass: OrmTodoListsQueryRepository }
  ],
  exports: [
    TodoListsCommandRepository,
    TodoListsQueryRepository
  ]
})
export class TypeOrmListsPersistenceModule {}
