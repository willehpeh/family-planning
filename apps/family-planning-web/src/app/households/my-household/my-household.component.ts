import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ScaffoldingComponent } from '../../layout/scaffolding/scaffolding.component';
import { CardComponent } from '../../ui-elements/card/card.component';
import { Store } from '@ngrx/store';
import {
  selectMyHouseholdMembers,
  selectMyHouseholdName,
  selectMyHouseholdPendingMembers
} from '../state/households.selectors';
import { HouseholdMemberInfo } from '../models/household-member-info';
import { ButtonComponent } from '../../ui-elements/button/button.component';

@Component({
  selector: "app-my-household",
  standalone: true,
  imports: [CommonModule, ScaffoldingComponent, CardComponent, ButtonComponent],
  templateUrl: "./my-household.component.html",
  styleUrl: "./my-household.component.scss",
})
export class MyHouseholdComponent {
  private readonly store = inject(Store);
  protected readonly householdName: Signal<string>;
  protected readonly householdMembers: Signal<HouseholdMemberInfo[]>;
  protected readonly pendingHouseholdMembers: Signal<HouseholdMemberInfo[]>;

  constructor() {
    this.householdName = this.store.selectSignal(selectMyHouseholdName);
    this.householdMembers = this.store.selectSignal(selectMyHouseholdMembers);
    this.pendingHouseholdMembers = this.store.selectSignal(selectMyHouseholdPendingMembers);
  }
}
