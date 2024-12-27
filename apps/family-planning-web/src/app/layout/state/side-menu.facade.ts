import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CloseSideMenu } from './ui/ui.actions';
import { Router } from '@angular/router';
import { AuthFacade } from '../../auth/state/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class SideMenuFacade {

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly authFacade = inject(AuthFacade);

  close(): void {
    this.store.dispatch(CloseSideMenu());
  }

  goToMyHousehold(): void {
    this.close();
    this.router.navigate(['households', 'my-household']);
  }

  goToCommandCentre(): void {
    this.close();
    this.router.navigate(['command-centre']);
  }

  logout(): void {
    this.close();
    this.authFacade.logout();
  }
}
