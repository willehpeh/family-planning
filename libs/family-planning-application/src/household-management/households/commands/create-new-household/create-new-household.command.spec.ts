import { CreateNewHouseholdCommand, CreateNewHouseholdCommandHandler } from '.';
import { InMemoryHouseholdRepository } from '../../test-fixtures';
import { CreateNewHouseholdDto } from './create-new-household.dto';
import { HouseholdSnapshot } from '@family-planning/domain';

describe('CreateNewHouseholdCommand', () => {
  let command: CreateNewHouseholdCommand;
  let handler: CreateNewHouseholdCommandHandler;
  let inMemoryHouseholdRepository: InMemoryHouseholdRepository;
  let dto: CreateNewHouseholdDto;

  let createdHouseholdSnapshot: HouseholdSnapshot;

  beforeEach(async () => {
    inMemoryHouseholdRepository = new InMemoryHouseholdRepository();
    handler = new CreateNewHouseholdCommandHandler(inMemoryHouseholdRepository);
    dto = {
      householdName: 'newHouseholdName',
      foundingMember: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        userId: 'user-id1'
      }
    };
    command = new CreateNewHouseholdCommand(dto);
    await handler.execute(command);
    createdHouseholdSnapshot = inMemoryHouseholdRepository.households()[0];
  });

  it('should create the new household with the provided name', async () => {
    expect(createdHouseholdSnapshot.name()).toBe(dto.householdName);
  });

  it('should have a single member', async () => {
    expect(createdHouseholdSnapshot.members()).toHaveLength(1);
  });

  it('should create a new member with the provided user ID', async () => {
    expect(createdHouseholdSnapshot.members()[0].userId()).toBe(dto.foundingMember.userId);
  });

  it('should create a new member with the provided first name', async () => {
    expect(createdHouseholdSnapshot.members()[0].firstName()).toBe(dto.foundingMember.firstName);
  });

  it('should create a new member with the provided last name', async () => {
    expect(createdHouseholdSnapshot.members()[0].lastName()).toBe(dto.foundingMember.lastName);
  });

  it('should create a new member with the provided email', async () => {
    expect(createdHouseholdSnapshot.members()[0].email()).toBe(dto.foundingMember.email);
  });

  it('should create a new member with the provided household ID', async () => {
    expect(createdHouseholdSnapshot.members()[0].householdId()).toBe(inMemoryHouseholdRepository.households()[0].id());
  });

});

