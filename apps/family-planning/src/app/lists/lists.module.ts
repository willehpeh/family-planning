import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmListsPersistenceModule } from '@family-planning/infrastructure';
import {
  AddItemToTodoListCommandHandler,
  CreateTodoListCommandHandler,
  FindAllListsQueryHandler,
  MarkDoneItemAsPendingCommandHandler,
  MarkItemAsDoneCommandHandler
} from '@family-planning/application';
import { ListsService } from './providers/lists.service';
import { ListsController } from './controllers/lists.controller';
import { TenantMiddleware } from '../middleware/tenant.middleware';

@Module({
  controllers: [
    ListsController
  ],
  imports: [
    TypeOrmListsPersistenceModule
  ],
  providers: [
    CreateTodoListCommandHandler,
    AddItemToTodoListCommandHandler,
    FindAllListsQueryHandler,
    MarkItemAsDoneCommandHandler,
    MarkDoneItemAsPendingCommandHandler,
    ListsService,
  ]
})
export class ListsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TenantMiddleware).forRoutes(ListsController);
  }
}

