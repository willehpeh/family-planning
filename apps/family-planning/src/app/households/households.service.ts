import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand } from '@family-planning/application';

@Injectable()
export class HouseholdsService {
  constructor(private readonly commandBus: CommandBus) {}

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
}
