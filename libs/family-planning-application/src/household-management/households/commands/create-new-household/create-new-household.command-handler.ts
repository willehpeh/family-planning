import {
  Email,
  FirstName,
  Household,
  HouseholdId,
  HouseholdMemberId,
  HouseholdName,
  HouseholdRepository,
  LastName,
  UserId
} from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand } from './create-new-household.command';

@CommandHandler(CreateNewHouseholdCommand)
export class CreateNewHouseholdCommandHandler implements ICommandHandler<CreateNewHouseholdCommand> {
  constructor(private readonly householdRepository: HouseholdRepository) {
  }

  async execute(command: CreateNewHouseholdCommand): Promise<void> {
    const householdDetails = {
      id: HouseholdId.new(),
      name: new HouseholdName(command.dto.householdName),
    };
    const member = command.dto.foundingMember;
    const foundingMember = {
      id: HouseholdMemberId.new(),
      userId: new UserId(member.userId),
      lastName: new LastName(member.lastName),
      firstName: new FirstName(member.firstName),
      email: new Email(member.email),
    };
    const household = Household.create(householdDetails, [foundingMember]);
    await this.householdRepository.save(household);
  }
}
