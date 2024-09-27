import { Module } from '@nestjs/common';
import { InMemoryTaskListsRepository, TaskListsService } from '@family-planning/application';
import { TaskListsRepository } from '@family-planning/domain';
import { ListsController } from './lists.controller';

@Module({
  controllers: [
    ListsController,
  ],
  providers: [
    {
      provide: 'TaskListsRepository',
      useFactory: () => process.env['NODE_ENV'] === 'development' ? new InMemoryTaskListsRepository() : new InMemoryTaskListsRepository(),
    },
    {
      provide: TaskListsService,
      useFactory: (repo: TaskListsRepository) => new TaskListsService(repo),
      inject: ['TaskListsRepository'],
    }
  ],
})
export class ListsModule {}
