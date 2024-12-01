import { Module } from '@nestjs/common';
import {
  TypeOrmHouseholdsPersistenceModule
} from '@family-planning/infrastructure';
import { CreateNewHouseholdCommandHandler, FindHouseholdForUserIdQueryHandler } from '@family-planning/application';
import { HouseholdsService } from './households.service';
import { HouseholdsController } from './households.controller';

@Module({
  controllers: [
    HouseholdsController
  ],
  imports: [
    TypeOrmHouseholdsPersistenceModule
  ],
  providers: [
    CreateNewHouseholdCommandHandler,
    HouseholdsService,
    FindHouseholdForUserIdQueryHandler
  ]
})
export class HouseholdsModule {}
