import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmListsPersistenceModule } from '@family-planning/infrastructure';
import {
  CreateTodoListCommandHandler,
  CreateTodoListItemCommandHandler,
  FindAllListsQueryHandler,
  MarkDoneItemAsPendingCommandHandler,
  MarkItemAsDoneCommandHandler,
  TodoListItemCreatedEventHandler
} from '@family-planning/application';
import { ListsService } from './providers/lists.service';
import { ListsController } from './controllers/lists.controller';
import { TenantMiddleware } from '../middleware/tenant.middleware';
import { EventBus } from '@family-planning/domain';
import { EventBus as NestEventBus } from '@nestjs/cqrs';

@Module({
  controllers: [
    ListsController
  ],
  imports: [
    TypeOrmListsPersistenceModule
  ],
  providers: [
    CreateTodoListCommandHandler,
    CreateTodoListItemCommandHandler,
    FindAllListsQueryHandler,
    MarkItemAsDoneCommandHandler,
    MarkDoneItemAsPendingCommandHandler,
    ListsService,
    TodoListItemCreatedEventHandler,
    { provide: EventBus, useExisting: NestEventBus }
  ]
})
export class ListsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TenantMiddleware).forRoutes(ListsController);
  }
}

