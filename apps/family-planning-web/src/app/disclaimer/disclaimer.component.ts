import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { Store } from '@ngrx/store';
import { AcceptDisclaimer } from '../state/disclaimer.actions';
import { HeaderComponent } from '../layout/header/header.component';

@Component({
  selector: "app-disclaimer",
  standalone: true,
  imports: [CommonModule, ButtonComponent, HeaderComponent],
  templateUrl: "./disclaimer.component.html",
  styleUrl: "./disclaimer.component.scss",
})
export class DisclaimerComponent {

  private store = inject(Store);

  onAcceptDisclaimer() {
    this.store.dispatch(AcceptDisclaimer());
  }
}
