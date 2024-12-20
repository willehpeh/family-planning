import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmHouseholdsPersistenceModule } from '@family-planning/infrastructure';
import {
  CreateNewHouseholdCommandHandler,
  FindHouseholdForUserIdQueryHandler,
  HouseholdMemberInvitationSaga
} from '@family-planning/application';
import { HouseholdsService } from './households.service';
import { HouseholdsController } from './households.controller';
import { HouseholdSagaRegistry } from './providers/household-saga-registry.service';
import { EventBus } from '@nestjs/cqrs';
import { filter } from 'rxjs';
import { isDomainEvent } from '@family-planning/domain';

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
    FindHouseholdForUserIdQueryHandler,
    HouseholdSagaRegistry,
    {
      provide: HouseholdMemberInvitationSaga,
      useFactory: (eventBus: EventBus) =>
        new HouseholdMemberInvitationSaga(eventBus.pipe(filter(event => isDomainEvent(event)))),
      inject: [EventBus]
    }
  ]
})
export class HouseholdsModule implements OnModuleInit {

  constructor(private readonly householdSagaRegistry: HouseholdSagaRegistry,
              private readonly householdMemberInvitationSaga: HouseholdMemberInvitationSaga) {
  }

  onModuleInit() {
    this.householdSagaRegistry.registerSaga(this.householdMemberInvitationSaga);
  }
}
