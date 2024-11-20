import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AcceptDisclaimer } from '../state/disclaimer.actions';
import { HeaderComponent } from '../layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: "app-disclaimer",
  standalone: true,
  imports: [CommonModule, ButtonComponent, HeaderComponent],
  templateUrl: "./disclaimer.component.html",
  styleUrl: "./disclaimer.component.scss",
})
export class DisclaimerComponent {

  constructor(private store: Store,
              private router: Router,
              private http: HttpClient) {
    this.http.get('/api/auth/userinfo').pipe(
      tap(console.log)
    ).subscribe();
  }

  onAcceptDisclaimer() {
    this.store.dispatch(AcceptDisclaimer());
    this.router.navigate(['dashboard']);
  }
}
