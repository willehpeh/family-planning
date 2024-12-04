import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUserGivenName } from '../../auth/state/auth.selectors';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { CardComponent } from '../../ui-elements/card/card.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CreateHousehold } from '../state/households.actions';

@Component({
  selector: 'app-new-household',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, ReactiveFormsModule],
  templateUrl: './new-household.component.html',
  styleUrl: './new-household.component.scss',
})
export class NewHouseholdComponent {
  userGivenName: Signal<string>;
  formIsInvalid: Signal<boolean>;
  newHouseholdNameCtrl = new FormControl<string>('', {
    validators: [Validators.required, Validators.minLength(5)],
    nonNullable: true,
  });
  private store = inject(Store);

  constructor() {
    this.userGivenName = this.store.selectSignal(selectUserGivenName);
    this.formIsInvalid = toSignal(this.newHouseholdNameCtrl.statusChanges.pipe(
      map(status => status !== 'VALID'),
    ), { initialValue: true });
  }

  onSubmitHouseholdName() {
    this.store.dispatch(CreateHousehold({ householdName: this.newHouseholdNameCtrl.value }));
    this.newHouseholdNameCtrl.disable();
  }
}
