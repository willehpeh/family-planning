import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { HouseholdMemberInfo } from '../models/household-member-info';
import {
  selectMyHouseholdMembers,
  selectMyHouseholdName,
  selectMyHouseholdPendingMembers
} from './households.selectors';

@Injectable()
export class HouseholdsFacade {
  private readonly store = inject(Store);

  myHousehold(): { name: Signal<string>, members: Signal<HouseholdMemberInfo[]>, pendingMembers: Signal<HouseholdMemberInfo[]> } {
    return {
      name: this.store.selectSignal(selectMyHouseholdName),
      members: this.store.selectSignal(selectMyHouseholdMembers),
      pendingMembers: this.store.selectSignal(selectMyHouseholdPendingMembers),
    };
  }
}
