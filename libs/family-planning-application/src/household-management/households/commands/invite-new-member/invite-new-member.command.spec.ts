import {
  InMemoryHouseholdRepository,
  TEST_HOUSEHOLD_ID,
  TEST_HOUSEHOLD_MEMBER_EMAIL,
  TEST_HOUSEHOLD_SNAPSHOT, TEST_HOUSEHOLD_SNAPSHOT_WITH_PENDING_MEMBER, TEST_PENDING_MEMBER_EMAIL
} from '../../test-fixtures';
import { InviteNewMemberCommand, InviteNewMemberCommandHandler, InviteNewMemberDto } from './';
import { NewMemberInvitedEvent } from '@family-planning/domain';
import { FakeEventBus } from '../../../../shared';

describe('Invite new member', () => {
  let command: InviteNewMemberCommand;
  let handler: InviteNewMemberCommandHandler;
  let dto: InviteNewMemberDto;
  let inMemoryHouseholdRepository: InMemoryHouseholdRepository;
  let fakeEventBus: FakeEventBus;

  describe('Given invited member already exists (email)', () => {

    beforeEach(() => {
      dto = {
        householdId: TEST_HOUSEHOLD_ID.value(),
        firstName: 'John',
        lastName: 'Doe',
        email: TEST_HOUSEHOLD_MEMBER_EMAIL.value(),
      };
      command = new InviteNewMemberCommand(dto);
      inMemoryHouseholdRepository = new InMemoryHouseholdRepository().withSnapshots([TEST_HOUSEHOLD_SNAPSHOT]);
      fakeEventBus = new FakeEventBus();
      handler = new InviteNewMemberCommandHandler(inMemoryHouseholdRepository, fakeEventBus);
    });

    it('should not be able to invite the member', async () => {
      await expect(handler.execute(command)).rejects.toBeInstanceOf(Error);
    });

  });

  describe('Given invited member is already pending (email)', () => {

    beforeEach(() => {
      dto = {
        householdId: TEST_HOUSEHOLD_ID.value(),
        firstName: 'John',
        lastName: 'Doe',
        email: TEST_PENDING_MEMBER_EMAIL.value(),
      };
      command = new InviteNewMemberCommand(dto);
      inMemoryHouseholdRepository = new InMemoryHouseholdRepository().withSnapshots([TEST_HOUSEHOLD_SNAPSHOT_WITH_PENDING_MEMBER]);
      fakeEventBus = new FakeEventBus();
      handler = new InviteNewMemberCommandHandler(inMemoryHouseholdRepository, fakeEventBus);
    });

    it('should not be able to invite the member', async () => {
      await expect(handler.execute(command)).rejects.toBeInstanceOf(Error);
    });

  });

  describe('Given invited member does not already exist', () => {
    beforeEach(() => {
      dto = {
        householdId: TEST_HOUSEHOLD_ID.value(),
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

    describe('Raised event', () => {

      let raisedEvent: NewMemberInvitedEvent;

      beforeEach(async () => {
        await handler.execute(command);
        raisedEvent = fakeEventBus.events[0] as NewMemberInvitedEvent;
      });

      it('should raise the correct type of event', async () => {
        expect(raisedEvent).toBeInstanceOf(NewMemberInvitedEvent);
      });

      it('should raise the event with the correct name', async () => {
        expect(raisedEvent.eventName()).toBe('NewMemberInvited');
      });

      it('should raise the event with the correct details', () => {
        expect(raisedEvent).toMatchObject({
          householdId: TEST_HOUSEHOLD_ID.value(),
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          memberId: inMemoryHouseholdRepository.households()[0].pendingMembers()[0].id
        });
      });
    });
  })

});
