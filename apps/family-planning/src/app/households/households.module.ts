import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmHouseholdsPersistenceModule } from '@family-planning/infrastructure';
import {
  ConfirmNewMemberCommandHandler,
  CreateNewHouseholdCommandHandler,
  FindHouseholdForUserIdQueryHandler,
  HouseholdMemberInvitationSaga,
  InviteNewMemberCommandHandler
} from '@family-planning/application';
import { HouseholdsService } from './providers/households.service';
import { HouseholdsController } from './controllers/households.controller';
import { HouseholdSagaRegistry } from './providers/household-saga-registry.service';
import { EventBus, isDomainEvent } from '@family-planning/domain';
import { filter } from 'rxjs';
import { EventBus as NestEventBus } from '@nestjs/cqrs';

@Module({
  controllers: [
    HouseholdsController
  ],
  imports: [
    TypeOrmHouseholdsPersistenceModule
  ],
  providers: [
    {
      provide: EventBus,
      useExisting: NestEventBus
    },
    CreateNewHouseholdCommandHandler,
    HouseholdsService,
    FindHouseholdForUserIdQueryHandler,
    InviteNewMemberCommandHandler,
    ConfirmNewMemberCommandHandler,
    HouseholdSagaRegistry,
    {
      provide: HouseholdMemberInvitationSaga,
      useFactory: (eventBus: NestEventBus) =>
        new HouseholdMemberInvitationSaga(eventBus.pipe(filter(event => isDomainEvent(event)))),
      inject: [EventBus]
    },
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
