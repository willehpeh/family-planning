import { Component, output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../ui-elements/button/button.component';

@Component({
    selector: "app-member-invitation-form",
    imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
    templateUrl: "./member-invitation-form.component.html",
    styleUrl: "./member-invitation-form.component.scss"
})
export class MemberInvitationFormComponent {

  memberInvite = output<{ firstName: string, lastName: string, email: string }>();

  firstNameCtrl: FormControl<string>;
  lastNameCtrl: FormControl<string>;
  emailCtrl: FormControl<string>;

  invitationForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
  }>

  constructor() {
    this.firstNameCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
    this.lastNameCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
    this.emailCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });

    this.invitationForm = new FormGroup({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      email: this.emailCtrl,
    });
  }

  onSendInvitation() {
    this.memberInvite.emit({
      firstName: this.firstNameCtrl.value,
      lastName: this.lastNameCtrl.value,
      email: this.emailCtrl.value,
    });
  }
}
