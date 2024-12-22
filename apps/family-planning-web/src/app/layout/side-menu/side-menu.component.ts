import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { faArrowRightFromBracket, faHouse, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { CloseSideMenu } from '../state/ui/ui.actions';
import { SideMenuItemComponent } from './side-menu-item/side-menu-item.component';

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
    { label: 'My Household', iconDefinition: faHouse },
    { label: 'Logout', iconDefinition: faArrowRightFromBracket }
  ]
  private readonly store = inject(Store);

  onCloseMenu() {
    this.store.dispatch(CloseSideMenu());
  }
}
