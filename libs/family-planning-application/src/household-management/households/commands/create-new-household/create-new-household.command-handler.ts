import {
  Email,
  FirstName,
  Household,
  HouseholdId,
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
      const household = this.createHousehold(command.dto.householdName, householdId, creatingMemberId);
      await repositories.householdRepository().save(household);
      await repositories.householdMemberRepository().save(creatingMember);
    });
  }

  private createHousehold(householdNameRaw: string, householdId: HouseholdId, creatingMemberId: HouseholdMemberId) {
    const householdName = new HouseholdName(householdNameRaw);
    return new Household(householdId, householdName, [creatingMemberId]);
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
