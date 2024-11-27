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

  describe('Given a creating household member', () => {

    beforeEach(async () => await handler.execute(command));

    test('the household should have only one member', async () => {
      expect(inMemoryHouseholdRepository.households()[0].members().length).toBe(1);
    });

    test('that member should have the correct user ID', async () => {
      expect(inMemoryHouseholdRepository.households()[0].members()[0].userId()).toBe(dto.creatingMember.userId);
    });

    test('that member should have the correct first name', async () => {
      expect(inMemoryHouseholdRepository.households()[0].members()[0].firstName()).toBe(dto.creatingMember.firstName);
    });

    test('that member should have the correct last name', async () => {
      expect(inMemoryHouseholdRepository.households()[0].members()[0].lastName()).toBe(dto.creatingMember.lastName);
    });

    test('that member should have the correct email', async () => {
      expect(inMemoryHouseholdRepository.households()[0].members()[0].email()).toBe(dto.creatingMember.email);
    });

  });

});

