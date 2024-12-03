import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand, FindHouseholdForUserIdQuery } from '@family-planning/application';
import { HouseholdReadModel } from '@family-planning/domain';

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

  async getHouseholdForUserId(id: string): Promise<HouseholdReadModel> {
    const household = await this.queryBus.execute(new FindHouseholdForUserIdQuery(id));
    if (!household) {
      throw new NotFoundException('No household found for user');
    }
    return household;
  }
}
