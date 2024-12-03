import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmListsPersistenceModule } from '@family-planning/infrastructure';
import {
  AddItemToTodoListCommandHandler,
  CreateTodoListCommandHandler,
  FindAllListsQueryHandler
} from '@family-planning/application';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
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
    ListsService,
  ]
})
export class ListsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TenantMiddleware).forRoutes("lists/*");
  }
}
