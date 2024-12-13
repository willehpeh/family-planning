import { CreateNewHouseholdCommand } from './create-new-household.command';
import { CreateNewHouseholdCommandHandler } from './create-new-household.command-handler';
import {
  InMemoryHouseholdRepository,
  InMemoryHouseholdMemberRepository,
  InMemoryUnitOfWork
} from '../../test-fixtures';
import { CreateNewHouseholdDto } from './create-new-household.dto';
import { HouseholdSnapshot } from '@family-planning/domain';

describe('CreateNewHouseholdCommand', () => {
  let command: CreateNewHouseholdCommand;
  let handler: CreateNewHouseholdCommandHandler;
  let inMemoryHouseholdRepository: InMemoryHouseholdRepository;
  let inMemoryHouseholdMemberRepository: InMemoryHouseholdMemberRepository;
  let inMemoryUnitOfWork: InMemoryUnitOfWork;
  let dto: CreateNewHouseholdDto;

  let createdHouseholdSnapshot: HouseholdSnapshot;

  beforeEach(async () => {
    inMemoryHouseholdRepository = new InMemoryHouseholdRepository();
    inMemoryHouseholdMemberRepository = new InMemoryHouseholdMemberRepository();
    inMemoryUnitOfWork = new InMemoryUnitOfWork(
      inMemoryHouseholdRepository,
      inMemoryHouseholdMemberRepository
    );
    handler = new CreateNewHouseholdCommandHandler(inMemoryUnitOfWork);
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
    await handler.execute(command);
    createdHouseholdSnapshot = inMemoryHouseholdRepository.households()[0];
  });

  it('should create the new household with the provided name', async () => {
    expect(createdHouseholdSnapshot.name()).toBe(dto.householdName);
  });

  it('should have a single member', async () => {
    expect(createdHouseholdSnapshot.memberIds()).toHaveLength(1);
  });

  it('should create a new member with the provided user ID', async () => {
    expect(inMemoryHouseholdMemberRepository.members()[0].userId()).toBe(dto.creatingMember.userId);
  });

  it('should create a new member with the provided first name', async () => {
    expect(inMemoryHouseholdMemberRepository.members()[0].firstName()).toBe(dto.creatingMember.firstName);
  });

  it('should create a new member with the provided last name', async () => {
    expect(inMemoryHouseholdMemberRepository.members()[0].lastName()).toBe(dto.creatingMember.lastName);
  });

  it('should create a new member with the provided email', async () => {
    expect(inMemoryHouseholdMemberRepository.members()[0].email()).toBe(dto.creatingMember.email);
  });

  it('should create a new member with the provided household ID', async () => {
    expect(inMemoryHouseholdMemberRepository.members()[0].householdId()).toBe(inMemoryHouseholdRepository.households()[0].id());
  });

  it('should add the new member ID to the household', async () => {
    expect(inMemoryHouseholdRepository.households()[0].memberIds()).toEqual([inMemoryHouseholdMemberRepository.members()[0].id()]);
  });

});

