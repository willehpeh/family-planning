import { CreateNewHouseholdCommand } from './create-new-household.command';
import { CreateNewHouseholdCommandHandler } from './create-new-household.command-handler';
import { InMemoryHouseholdCommandRepository } from '../../test-fixtures/in-memory.household.command-repository';
import { CreateNewHouseholdDto } from './create-new-household.dto';

describe('CreateNewHouseholdCommand', () => {
  let command: CreateNewHouseholdCommand;
  let handler: CreateNewHouseholdCommandHandler;
  let inMemoryHouseholdRepository: InMemoryHouseholdCommandRepository;
  let dto: CreateNewHouseholdDto;
});

