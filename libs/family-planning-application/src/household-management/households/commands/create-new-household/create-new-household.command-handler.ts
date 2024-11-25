import { HouseholdCommandRepository } from "@family-planning/domain";
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewHouseholdCommand } from './create-new-household.command';

@CommandHandler(CreateNewHouseholdCommand)
export class CreateNewHouseholdCommandHandler implements ICommandHandler<CreateNewHouseholdCommand>{
  constructor(private readonly repository: HouseholdCommandRepository) {}

  execute(command: CreateNewHouseholdCommand): Promise<void> {
    return Promise.resolve();
  }
}
