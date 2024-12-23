import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { faArrowRightFromBracket, faHouse, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { CloseSideMenu } from '../state/ui/ui.actions';
import { SideMenuItemComponent } from './side-menu-item/side-menu-item.component';
import { Logout } from '../../auth/state/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FaIconComponent, SideMenuItemComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  protected readonly faXmark = faXmark;
  protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
  protected readonly faHouse = faHouse;
  protected readonly menuItems = [
    { label: 'My Household', iconDefinition: faHouse, action: () => this.onGoToMyHousehold() },
    { label: 'Logout', iconDefinition: faArrowRightFromBracket, action: () => this.onLogout() },
  ]
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  onCloseMenu() {
    this.store.dispatch(CloseSideMenu());
  }

  onGoToMyHousehold() {
    this.store.dispatch(CloseSideMenu());
    this.router.navigate(['households', 'my-household']);
  }

  onLogout() {
    this.store.dispatch(CloseSideMenu());
    this.store.dispatch(Logout());
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-side-menu')) {
      this.store.dispatch(CloseSideMenu());
    }
  }
}
