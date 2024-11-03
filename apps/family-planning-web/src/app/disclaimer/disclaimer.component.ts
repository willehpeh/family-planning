import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AcceptDisclaimer } from '../state/disclaimer.actions';

@Component({
  selector: "app-disclaimer",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./disclaimer.component.html",
  styleUrl: "./disclaimer.component.scss",
})
export class DisclaimerComponent {

  constructor(private store: Store,
              private router: Router) {
  }

  onAcceptDisclaimer() {
    this.store.dispatch(AcceptDisclaimer());
    this.router.navigate(['dashboard']);
  }
}
