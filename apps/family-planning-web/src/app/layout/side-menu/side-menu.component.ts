import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { faArrowRightFromBracket, faHouse, faTableCellsLarge, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SideMenuItemComponent } from './side-menu-item/side-menu-item.component';
import { SideMenuFacade } from '../state/side-menu.facade';

@Component({
    selector: 'app-side-menu',
    imports: [CommonModule, ButtonComponent, FaIconComponent, SideMenuItemComponent],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  protected readonly faXmark = faXmark;
  protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
  protected readonly faHouse = faHouse;
  protected readonly menuItems = [
    { label: 'Command Centre', iconDefinition: faTableCellsLarge, action: () => this.onGoToCommandCentre() },
    { label: 'My Household', iconDefinition: faHouse, action: () => this.onGoToMyHousehold() },
    { label: 'Logout', iconDefinition: faArrowRightFromBracket, action: () => this.onLogout() },
  ]
  private readonly sideMenuFacade = inject(SideMenuFacade);

  onCloseMenu() {
    this.close();
  }

  onGoToMyHousehold() {
    this.sideMenuFacade.goToMyHousehold();
  }

  onLogout() {
    this.sideMenuFacade.logout();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-side-menu')) {
      event.stopPropagation();
      event.preventDefault();
      this.close();
    }
  }

  private onGoToCommandCentre() {
    this.sideMenuFacade.goToCommandCentre();
  }

  private close(): void {
    this.sideMenuFacade.close();
  }
}
