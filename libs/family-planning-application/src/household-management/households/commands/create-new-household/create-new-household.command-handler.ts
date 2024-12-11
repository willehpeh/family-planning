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
      const { creatingMember, household } = this.createHouseholdAndMember(command);
      await repositories.householdRepository().save(household);
      await repositories.householdMemberRepository().save(creatingMember);
    });
  }

  private createHouseholdAndMember(command: CreateNewHouseholdCommand) {
    const creatingMemberId = HouseholdMemberId.new();
    const householdId = HouseholdId.new();
    const creatingMember = this.createMember(householdId, creatingMemberId, command.dto.creatingMember);
    const household = this.createHousehold(command.dto.householdName, householdId, creatingMemberId);
    return { creatingMember, household };
  }

  private createHousehold(householdNameRaw: string, householdId: HouseholdId, creatingMemberId: HouseholdMemberId) {
    const householdName = new HouseholdName(householdNameRaw);
    return new Household(householdId, householdName, [creatingMemberId]);
  }

  private createMember(householdId: HouseholdId, id: HouseholdMemberId, details: CreatingMemberDetails): HouseholdMember {
    return new HouseholdMember({
      id,
      householdId,
      firstName: new FirstName(details.firstName),
      lastName: new LastName(details.lastName),
      email: new Email(details.email),
      userId: new UserId(details.userId)
    });
  }
}
