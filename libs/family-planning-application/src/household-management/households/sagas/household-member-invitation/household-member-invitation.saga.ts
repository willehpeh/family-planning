import { filter, map, Observable } from 'rxjs';
import { DomainEvent, NewMemberInvitedEvent, UserCreatedForHouseholdEvent } from '@family-planning/domain';
import { CreateNewUserCommand } from '../../../../auth';
import { merge } from 'rxjs';
import { ConfirmNewMemberCommand } from '../../commands/confirm-new-member';

export class HouseholdMemberInvitationSaga {
  commands$: Observable<CreateNewUserCommand | ConfirmNewMemberCommand>;

  private createNewUser$ = this.events$.pipe(
    filter(event => event.eventName() === 'NewMemberInvited'),
    map(event => event as NewMemberInvitedEvent),
    map(event => new CreateNewUserCommand({
      firstName: event.memberFirstName,
      lastName: event.memberLastName,
      email: event.memberEmail,
      householdId: event.householdId,
      memberId: event.memberId,
    }))
  );

  private confirmNewMember$ = this.events$.pipe(
    filter(event => event.eventName() === 'UserCreatedForHousehold'),
    map(event => event as UserCreatedForHouseholdEvent),
    map(event => new ConfirmNewMemberCommand({
      userId: event.userId,
      memberId: event.memberId,
      householdId: event.householdId,
    }))
  );

  constructor(private readonly events$: Observable<DomainEvent>) {
    this.commands$ = merge(
      this.createNewUser$,
      this.confirmNewMember$
    )
  }
}
