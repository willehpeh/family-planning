import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Store } from '@ngrx/store';
import { selectUserGivenName } from '../../auth/state/auth.selectors';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { CardComponent } from '../../ui-elements/card/card.component';

@Component({
  selector: "app-new-household",
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent],
  templateUrl: "./new-household.component.html",
  styleUrl: "./new-household.component.scss",
})
export class NewHouseholdComponent {
  private store = inject(Store);
  userGivenName: Signal<string>;

  constructor() {
    this.userGivenName = this.store.selectSignal(selectUserGivenName);
  }
}
