import {
  Email,
  FirstName,
  Household, HouseholdId,
  HouseholdMember,
  HouseholdMemberId,
  HouseholdName,
  LastName,
  UserId
} from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand } from './create-new-household.command';
import { HouseholdUnitOfWork } from '../../providers';
import { CreatingMemberDetails } from './creating-member-details';

@CommandHandler(CreateNewHouseholdCommand)
export class CreateNewHouseholdCommandHandler implements ICommandHandler<CreateNewHouseholdCommand>{
  constructor(private readonly unitOfWork: HouseholdUnitOfWork) {}

  async execute(command: CreateNewHouseholdCommand): Promise<void> {
    await this.unitOfWork.transaction(async (repositories) => {
      const creatingMemberId = HouseholdMemberId.new();
      const householdId = HouseholdId.new();
      const creatingMember = this.createMember(householdId, creatingMemberId, command.dto.creatingMember);
      const householdName = new HouseholdName(command.dto.householdName);
      const household = new Household(householdId, householdName, [creatingMemberId]);
      await repositories.householdCommandRepository().save(household);
      await repositories.householdMemberRepository().save(creatingMember);
    });
  }

  private createMember(householdId: HouseholdId, id: HouseholdMemberId, details: CreatingMemberDetails): HouseholdMember {
    return new HouseholdMember(
      id,
      new UserId(details.userId),
      householdId,
      new LastName(details.lastName),
      new FirstName(details.firstName),
      new Email(details.email)
    );
  }
}
