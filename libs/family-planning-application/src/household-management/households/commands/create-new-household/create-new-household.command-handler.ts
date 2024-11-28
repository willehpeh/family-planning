import { Household, HouseholdName } from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand } from './create-new-household.command';
import { HouseholdUnitOfWork } from '../../providers/household.unit-of-work';

@CommandHandler(CreateNewHouseholdCommand)
export class CreateNewHouseholdCommandHandler implements ICommandHandler<CreateNewHouseholdCommand>{
  constructor(private readonly unitOfWork: HouseholdUnitOfWork) {}

  async execute(command: CreateNewHouseholdCommand): Promise<void> {
    await this.unitOfWork.transaction(async (repositories) => {
      const householdRepository = repositories.householdCommandRepository();
      const householdName = new HouseholdName(command.dto.householdName);
      const household = Household.createNew(householdName, command.dto.creatingMember);
      await householdRepository.save(household);
    });
  }
}
