import { Household, HouseholdCommandRepository } from '@family-planning/domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand } from './create-new-household.command';

@CommandHandler(CreateNewHouseholdCommand)
export class CreateNewHouseholdCommandHandler implements ICommandHandler<CreateNewHouseholdCommand>{
  constructor(private readonly repository: HouseholdCommandRepository) {}

  execute(command: CreateNewHouseholdCommand): Promise<void> {
    const household = Household.createNew(command.dto.householdName, command.dto.creatingMember);
    return this.repository.save(household);
  }
}
