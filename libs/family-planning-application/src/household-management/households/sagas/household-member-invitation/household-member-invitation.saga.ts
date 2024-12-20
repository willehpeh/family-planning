import { filter, map, merge, Observable } from 'rxjs';
import { DomainEvent, NewMemberInvitedEvent, UserCreatedForHouseholdEvent } from '@family-planning/domain';
import { CreateNewUserCommand } from '../../../../auth';
import { ConfirmNewMemberCommand } from '../../commands/confirm-new-member';

export class HouseholdMemberInvitationSaga {
  commands$: Observable<CreateNewUserCommand | ConfirmNewMemberCommand>;

  private createNewUser$ = this.events$.pipe(
    filter(event => event.eventName() === 'NewMemberInvited'),
    map(event => event as NewMemberInvitedEvent),
    map(event => new CreateNewUserCommand({
      firstName: event.firstName,
      lastName: event.lastName,
      email: event.email,
      householdId: event.householdId,
      memberId: event.memberId,
    }))
  );

  private confirmNewMember$ = this.events$.pipe(
    filter(event => event.eventName() === 'UserCreatedForHousehold'),
    map(event => event as UserCreatedForHouseholdEvent),
    map(({ userId, memberId, householdId }) =>
      new ConfirmNewMemberCommand({
        userId,
        memberId,
        householdId,
      })
    )
  );

  constructor(private readonly events$: Observable<DomainEvent>) {
    this.commands$ = merge(
      this.createNewUser$,
      this.confirmNewMember$
    );
  }
}
