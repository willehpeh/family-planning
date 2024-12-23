import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ScaffoldingComponent } from '../../layout/scaffolding/scaffolding.component';
import { CardComponent } from '../../ui-elements/card/card.component';
import { Store } from '@ngrx/store';
import {
  selectInvitingNewMember,
  selectMyHouseholdMembers,
  selectMyHouseholdName,
  selectMyHouseholdPendingMembers
} from '../state/households.selectors';
import { HouseholdMemberInfo } from '../models/household-member-info';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { InviteNewMember, StartInvitingNewMember } from '../state/households.actions';
import { MyHouseholdInfoRowComponent } from './my-household-info-row/my-household-info-row.component';
import { MemberInvitationFormComponent } from './member-invitation-form/member-invitation-form.component';
import { MyHouseholdMemberListComponent } from './my-household-member-list/my-household-member-list.component';

@Component({
  selector: "app-my-household",
  standalone: true,
  imports: [CommonModule, ScaffoldingComponent, CardComponent, ButtonComponent, MyHouseholdInfoRowComponent, MemberInvitationFormComponent, MyHouseholdMemberListComponent],
  templateUrl: "./my-household.component.html",
  styleUrl: "./my-household.component.scss",
})
export class MyHouseholdComponent {
  private readonly store = inject(Store);
  protected readonly householdName: Signal<string>;
  protected readonly householdMembers: Signal<HouseholdMemberInfo[]>;
  protected readonly pendingHouseholdMembers: Signal<HouseholdMemberInfo[]>;
  protected readonly invitingNewMember: Signal<boolean>;

  constructor() {
    this.householdName = this.store.selectSignal(selectMyHouseholdName);
    this.householdMembers = this.store.selectSignal(selectMyHouseholdMembers);
    this.pendingHouseholdMembers = this.store.selectSignal(selectMyHouseholdPendingMembers);
    this.invitingNewMember = this.store.selectSignal(selectInvitingNewMember);
  }

  onStartInvitingNewMember() {
    this.store.dispatch(StartInvitingNewMember());
  }

  onInviteMember(member: { firstName: string; lastName: string; email: string }) {
    this.store.dispatch(InviteNewMember(member))
  }
}
