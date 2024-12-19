import {
  InMemoryHouseholdRepository,
  TEST_HOUSEHOLD_ID,
  TEST_HOUSEHOLD_SNAPSHOT_WITH_PENDING_MEMBER,
  TEST_PENDING_MEMBER_ID
} from '../../test-fixtures';
import { ConfirmNewMemberCommand } from './confirm-new-member.command';
import { ConfirmNewMemberCommandHandler } from './confirm-new-member.command-handler';
import { ConfirmNewMemberDto } from './confirm-new-member.dto';
import {
  Email,
  FirstName, HouseholdId,
  HouseholdMemberId,
  HouseholdMemberSnapshot,
  LastName,
  UserId
} from '@family-planning/domain';

describe('ConfirmNewMemberCommand', () => {
  let command: ConfirmNewMemberCommand;
  let handler: ConfirmNewMemberCommandHandler;
  let inMemoryHouseholdRepository: InMemoryHouseholdRepository;
  let dto: ConfirmNewMemberDto;

  beforeEach(() => {
    dto = {
      householdId: TEST_HOUSEHOLD_ID.value(),
      memberId: TEST_PENDING_MEMBER_ID.value(),
      userId: 'user-id',
    }
    command = new ConfirmNewMemberCommand(dto);
    inMemoryHouseholdRepository = new InMemoryHouseholdRepository().withSnapshots([TEST_HOUSEHOLD_SNAPSHOT_WITH_PENDING_MEMBER]);
    handler = new ConfirmNewMemberCommandHandler(inMemoryHouseholdRepository);
  });

  it('should remove the pending member from the household', async () => {
    await handler.execute(command);
    const householdSnapshot = inMemoryHouseholdRepository.households()[0];
    expect(householdSnapshot.pendingMembers()).toHaveLength(0);
  });

  it('should create a permanent member from the pending member', async () => {
    await handler.execute(command);
    const householdSnapshot = inMemoryHouseholdRepository.households()[0];
    const pendingMember = TEST_HOUSEHOLD_SNAPSHOT_WITH_PENDING_MEMBER.pendingMembers()[0];
    const newMember = householdSnapshot.members().find(member => member.id() === dto.memberId)
    expect(newMember).toEqual(new HouseholdMemberSnapshot({
      id: HouseholdMemberId.fromString(pendingMember.id),
      userId: new UserId(dto.userId),
      firstName: new FirstName(pendingMember.firstName),
      lastName: new LastName(pendingMember.lastName),
      email: new Email(pendingMember.email),
      householdId: HouseholdId.fromString(dto.householdId)
    }));
  });
});
