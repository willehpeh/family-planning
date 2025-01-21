import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { CardComponent } from '../../ui-elements/card/card.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HouseholdsFacade } from '../state/households.facade';
import { AuthFacade } from '../../auth/state/auth.facade';

@Component({
    selector: 'app-new-household',
    imports: [CommonModule, ButtonComponent, CardComponent, ReactiveFormsModule],
    templateUrl: './new-household.component.html',
    styleUrl: './new-household.component.scss'
})
export class NewHouseholdComponent {
  userGivenName: Signal<string>;
  formIsInvalid: Signal<boolean>;
  newHouseholdNameCtrl: FormControl<string>;
  private householdFacade = inject(HouseholdsFacade);
  private authFacade = inject(AuthFacade);

  constructor() {
    this.newHouseholdNameCtrl = this.createNewHouseholdCtrl();
    this.userGivenName = this.authFacade.userGivenName();
    this.formIsInvalid = this.formInvalidStatus();
  }

  onSubmitHouseholdName() {
    this.householdFacade.createNewHousehold(this.newHouseholdNameCtrl.value);
    this.newHouseholdNameCtrl.disable();
  }

  private createNewHouseholdCtrl() {
    return new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(5)],
      nonNullable: true,
    });
  }

  private formInvalidStatus() {
    return toSignal(this.newHouseholdNameCtrl.statusChanges.pipe(
      map(status => status !== 'VALID'),
    ), { initialValue: true });
  }
}
