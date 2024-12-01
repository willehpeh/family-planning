import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand, FindHouseholdForUserIdQuery } from '@family-planning/application';

@Injectable()
export class HouseholdsService {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  async createNewHousehold(name: string, userId: string, lastName: string, firstName: string, email: string) {
    await this.commandBus.execute(new CreateNewHouseholdCommand({
      householdName: name,
      creatingMember: {
        userId,
        firstName,
        lastName,
        email
      }
    }));
  }

  getMe(id: string) {
    return this.queryBus.execute(new FindHouseholdForUserIdQuery(id));
  }
}
