import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CloseSideMenu, OpenSideMenu } from './ui/ui.actions';
import { Router } from '@angular/router';
import { AuthFacade } from '../../auth/state/auth.facade';
import { selectSideMenuOpen } from './ui/ui.selectors';

@Injectable({
  providedIn: 'root'
})
export class SideMenuFacade {

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly authFacade = inject(AuthFacade);

  open(): void {
    this.store.dispatch(OpenSideMenu());
  }

  close(): void {
    this.store.dispatch(CloseSideMenu());
  }

  isOpen(): Signal<boolean> {
    return this.store.selectSignal(selectSideMenuOpen);
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
