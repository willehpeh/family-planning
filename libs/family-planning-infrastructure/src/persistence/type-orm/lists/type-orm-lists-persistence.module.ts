import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import { TodoListsCommandsRepository, TodoListsQueriesRepository } from '@family-planning/domain';
import { OrmTodoListsCommandsRepository } from './repositories/orm-todo-lists-commands.repository';
import { OrmTodoListsQueriesRepository } from './repositories/orm-todo-lists-queries.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoList,
      TodoListItem
    ])
  ],
  providers: [
    { provide: TodoListsCommandsRepository, useClass: OrmTodoListsCommandsRepository },
    { provide: TodoListsQueriesRepository, useClass: OrmTodoListsQueriesRepository }
  ],
  exports: [
    TodoListsCommandsRepository,
    TodoListsQueriesRepository
  ]
})
export class TypeOrmListsPersistenceModule {}
