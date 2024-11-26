import { Household, HouseholdCommandRepository, HouseholdName } from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand } from './create-new-household.command';

@CommandHandler(CreateNewHouseholdCommand)
export class CreateNewHouseholdCommandHandler implements ICommandHandler<CreateNewHouseholdCommand>{
  constructor(private readonly repository: HouseholdCommandRepository) {}

  execute(command: CreateNewHouseholdCommand): Promise<void> {
    const householdName = new HouseholdName(command.dto.householdName);
    const household = Household.createNew(householdName, command.dto.creatingMember);
    return this.repository.save(household);
  }
}
