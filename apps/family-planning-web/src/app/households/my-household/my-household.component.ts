import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../ui-elements/card/card.component';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { MyHouseholdInfoRowComponent } from './my-household-info-row/my-household-info-row.component';
import { MemberInvitationFormComponent } from './member-invitation-form/member-invitation-form.component';
import { MyHouseholdMemberListComponent } from './my-household-member-list/my-household-member-list.component';
import { HouseholdsFacade } from '../state/households.facade';
import { MemberInvitationInfo } from '../models/member-invitation-info';

@Component({
    selector: "app-my-household",
    imports: [CommonModule, CardComponent, ButtonComponent, MyHouseholdInfoRowComponent, MemberInvitationFormComponent, MyHouseholdMemberListComponent],
    templateUrl: "./my-household.component.html",
    styleUrl: "./my-household.component.scss"
})
export class MyHouseholdComponent {
  private readonly householdFacade = inject(HouseholdsFacade);
  protected readonly myHousehold = this.householdFacade.myHousehold();
  protected readonly invitingNewMember = signal<boolean>(false);

  onStartInvitingNewMember() {
    this.invitingNewMember.set(true);
  }

  onInviteMember(info: MemberInvitationInfo) {
    this.householdFacade.inviteMemberToHousehold(info);
    this.invitingNewMember.set(false);
  }
}
