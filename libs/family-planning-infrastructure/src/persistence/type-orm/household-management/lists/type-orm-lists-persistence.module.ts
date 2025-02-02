import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import {
  TodoListItemsCommandRepository,
  TodoListItemsQueryRepository,
  TodoListsCommandRepository,
  TodoListsQueryRepository
} from '@family-planning/domain';
import { OrmTodoListsCommandRepository } from './repositories/orm.todo-lists.command-repository';
import { OrmTodoListsQueryRepository } from './repositories/orm.todo-lists.query-repository';
import {
  InMemoryTodoListItemsQueryRepository
} from '../../../../../../family-planning-application/src/household-management/lists/todo/test-fixtures';
import { OrmTodoListItemsCommandRepository } from './repositories/orm.todo-list-items.command-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoList,
      TodoListItem
    ])
  ],
  providers: [
    { provide: TodoListsCommandRepository, useClass: OrmTodoListsCommandRepository },
    { provide: TodoListsQueryRepository, useClass: OrmTodoListsQueryRepository },
    { provide: TodoListItemsCommandRepository, useClass: OrmTodoListItemsCommandRepository },
    { provide: TodoListItemsQueryRepository, useClass: InMemoryTodoListItemsQueryRepository },
  ],
  exports: [
    TodoListsCommandRepository,
    TodoListsQueryRepository,
    TodoListItemsCommandRepository,
    TodoListItemsQueryRepository
  ]
})
export class TypeOrmListsPersistenceModule {}
