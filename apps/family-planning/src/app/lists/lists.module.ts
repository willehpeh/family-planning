import { Module } from '@nestjs/common';
import { TypeOrmListsPersistenceModule } from '@family-planning/infrastructure';
import {
  AddItemToTodoListCommandHandler,
  CreateTodoListCommandHandler,
  FindAllListsQueryHandler
} from '@family-planning/application';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';

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
export class ListsModule {
}
