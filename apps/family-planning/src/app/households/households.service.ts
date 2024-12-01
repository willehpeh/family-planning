import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand, FindHouseholdForUserIdQuery } from '@family-planning/application';

@Injectable()
export class HouseholdsService {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  async createNewHousehold(name: string) {
    await this.commandBus.execute(new CreateNewHouseholdCommand({
      householdName: name,
      creatingMember: {
        userId: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      }
    }));
  }

  getMe(id: string) {
    return this.queryBus.execute(new FindHouseholdForUserIdQuery(id));
  }
}
