import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../ui-elements/card/card.component';
import { Store } from '@ngrx/store';
import { selectInvitingNewMember } from '../state/households.selectors';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { InviteNewMember, StartInvitingNewMember } from '../state/households.actions';
import { MyHouseholdInfoRowComponent } from './my-household-info-row/my-household-info-row.component';
import { MemberInvitationFormComponent } from './member-invitation-form/member-invitation-form.component';
import { MyHouseholdMemberListComponent } from './my-household-member-list/my-household-member-list.component';
import { HouseholdsFacade } from '../state/households.facade';

@Component({
  selector: "app-my-household",
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, MyHouseholdInfoRowComponent, MemberInvitationFormComponent, MyHouseholdMemberListComponent],
  templateUrl: "./my-household.component.html",
  styleUrl: "./my-household.component.scss",
})
export class MyHouseholdComponent {
  private readonly store = inject(Store);
  private readonly householdFacade = inject(HouseholdsFacade);
  protected readonly myHousehold = this.householdFacade.myHousehold();
  protected readonly invitingNewMember: Signal<boolean>;

  constructor() {
    this.invitingNewMember = this.store.selectSignal(selectInvitingNewMember);
  }

  onStartInvitingNewMember() {
    this.store.dispatch(StartInvitingNewMember());
  }

  onInviteMember(member: { firstName: string; lastName: string; email: string }) {
    this.store.dispatch(InviteNewMember(member))
  }
}
