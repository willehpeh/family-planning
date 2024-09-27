import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { InMemoryTaskListsRepository, TaskListsService } from '@family-planning/application';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: InMemoryTaskListsRepository,
      useFactory: () => new InMemoryTaskListsRepository(),
    },
    {
      provide: TaskListsService,
      useFactory: (repo: InMemoryTaskListsRepository) => new TaskListsService(repo),
      inject: [InMemoryTaskListsRepository]
    }
  ],
})
export class AppModule {}
