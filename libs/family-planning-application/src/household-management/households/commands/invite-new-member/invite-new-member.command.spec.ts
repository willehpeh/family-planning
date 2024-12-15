import {
  FakeEventBus,
  InMemoryHouseholdRepository,
  TEST_HOUSEHOLD_ID,
  TEST_HOUSEHOLD_SNAPSHOT
} from '../../test-fixtures';
import { InviteNewMemberDto } from './invite-new-member.dto';
import { InviteNewMemberCommandHandler } from './invite-new-member.command-handler';
import { InviteNewMemberCommand } from './invite-new-member.command';
import { NewMemberInvitedEvent } from '@family-planning/domain';

describe('Invite new member', () => {
  let command: InviteNewMemberCommand;
  let handler: InviteNewMemberCommandHandler;
  let dto: InviteNewMemberDto;
  let inMemoryHouseholdRepository: InMemoryHouseholdRepository;
  let fakeEventBus: FakeEventBus;

  beforeEach(() => {
    dto = {
      householdId: TEST_HOUSEHOLD_ID.value(),
      username: 'john_doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    command = new InviteNewMemberCommand(dto);
    inMemoryHouseholdRepository = new InMemoryHouseholdRepository().withSnapshots([TEST_HOUSEHOLD_SNAPSHOT]);
    fakeEventBus = new FakeEventBus();
    handler = new InviteNewMemberCommandHandler(inMemoryHouseholdRepository, fakeEventBus);
  });

  it('should add a pending member to the household', async () => {
    await handler.execute(command);
    const household = inMemoryHouseholdRepository.households()[0];
    expect(household.pendingMembers()[0]).toMatchObject({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      householdId: TEST_HOUSEHOLD_ID.value(),
    });
  });

  it('should raise an event for the new member', async () => {
    await handler.execute(command);
    expect(fakeEventBus.events[0]).toBeInstanceOf(NewMemberInvitedEvent);
  });
});
