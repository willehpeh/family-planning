import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { TodoListItem } from './entities/todo-list-item.entity';
import { TodoListsCommandsRepository } from '@family-planning/domain';
import { OrmTodoListsCommandsRepository } from './repositories/orm-todo-lists-commands.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoList,
      TodoListItem
    ])
  ],
  providers: [
    { provide: TodoListsCommandsRepository, useClass: OrmTodoListsCommandsRepository }
  ],
  exports: [
    TodoListsCommandsRepository
  ]
})
export class TypeOrmListsPersistenceModule {}
