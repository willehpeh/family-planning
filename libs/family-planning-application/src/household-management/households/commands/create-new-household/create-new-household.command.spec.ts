import { CreateNewHouseholdCommand } from './create-new-household.command';
import { CreateNewHouseholdCommandHandler } from './create-new-household.command-handler';
import { InMemoryHouseholdCommandRepository } from '../../test-fixtures/in-memory.household.command-repository';
import { CreateNewHouseholdDto } from './create-new-household.dto';

describe('CreateNewHouseholdCommand', () => {
  let command: CreateNewHouseholdCommand;
  let handler: CreateNewHouseholdCommandHandler;
  let inMemoryHouseholdRepository: InMemoryHouseholdCommandRepository;
  let dto: CreateNewHouseholdDto;

  beforeEach(() => {
    inMemoryHouseholdRepository = new InMemoryHouseholdCommandRepository();
    handler = new CreateNewHouseholdCommandHandler(inMemoryHouseholdRepository);
    dto = {
      householdName: 'newHouseholdName',
      creatingMember: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        userId: 'user-id1'
      }
    };
    command = new CreateNewHouseholdCommand(dto);
  });

  it('should create the new household with the provided name', async () => {
    await handler.execute(command);
    expect(inMemoryHouseholdRepository.households()[0].name()).toBe(dto.householdName);
  });

});

