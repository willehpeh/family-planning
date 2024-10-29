import { Module } from '@nestjs/common';
import { TodoListsService } from './todo-lists.service';

@Module({
  providers: [
    TodoListsService
  ],
  exports: [
    TodoListsService
  ]
})
export class TodoListsModule {}
