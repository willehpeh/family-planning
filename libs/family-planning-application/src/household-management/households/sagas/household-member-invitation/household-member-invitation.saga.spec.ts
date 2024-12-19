import {
  Email,
  FirstName,
  HouseholdId,
  HouseholdMemberId,
  LastName,
  NewMemberInvitedEvent,
  PendingHouseholdMember,
  UserCreatedForHouseholdEvent
} from '@family-planning/domain';
import { HouseholdMemberInvitationSaga } from './household-member-invitation.saga';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { CreateNewUserCommand } from '../../../../auth';
import { ConfirmNewMemberCommand } from '../../commands/confirm-new-member';

describe('HouseholdMemberInvitationSaga', () => {
  let saga: HouseholdMemberInvitationSaga;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should emit a CreateNewUserCommand when a NewMemberInvitedEvent is received', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const householdId = HouseholdId.new();
      const memberId = HouseholdMemberId.new();
      const events$ = hot('-a-', {
        a: new NewMemberInvitedEvent(new PendingHouseholdMember({
          householdId,
          id: memberId,
          lastName: new LastName('Doe'),
          firstName: new FirstName('John'),
          email: new Email('john.doe@example.com'),
        }))
      });
      saga = new HouseholdMemberInvitationSaga(events$);
      const expected = '-b-';
      expectObservable(saga.commands$).toBe(expected, {
        b: new CreateNewUserCommand({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          householdId: householdId.value(),
          memberId: memberId.value(),
        })
      });
    });
  });

  it('should emit a ConfirmNewMemberCommand when a UserCreated event is received', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const householdId = HouseholdId.new().value();
      const memberId = HouseholdMemberId.new().value();
      const events$ = hot('-a-', {
        a: new UserCreatedForHouseholdEvent({
          userId: 'user-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          householdId,
          memberId,
        })
      });
      saga = new HouseholdMemberInvitationSaga(events$);
      const expected = '-b-';
      expectObservable(saga.commands$).toBe(expected, {
        b: new ConfirmNewMemberCommand({
          userId: 'user-id',
          memberId,
          householdId,
        })
      });
    });
  });

});
