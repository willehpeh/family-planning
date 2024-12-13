import {
  Email,
  FirstName,
  Household,
  HouseholdId,
  HouseholdMemberId,
  HouseholdName,
  LastName,
  UserId
} from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand } from './create-new-household.command';
import { HouseholdUnitOfWork } from '../../providers';

@CommandHandler(CreateNewHouseholdCommand)
export class CreateNewHouseholdCommandHandler implements ICommandHandler<CreateNewHouseholdCommand>{
  constructor(private readonly unitOfWork: HouseholdUnitOfWork) {}

  async execute(command: CreateNewHouseholdCommand): Promise<void> {
    await this.unitOfWork.transaction(async (repositories) => {
      const householdDetails = {
        id: HouseholdId.new(),
        name: new HouseholdName(command.dto.householdName),
      };
      const member = command.dto.foundingMember;
      const memberDetails = {
        id: HouseholdMemberId.new(),
        userId: new UserId(member.userId),
        lastName: new LastName(member.lastName),
        firstName: new FirstName(member.firstName),
        email: new Email(member.email),
      };
      const household = Household.newHousehold(householdDetails, memberDetails);
      await repositories.householdRepository().save(household);
    });
  }
}
