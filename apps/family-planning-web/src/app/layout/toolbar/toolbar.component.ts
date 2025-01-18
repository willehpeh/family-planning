import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { AuthFacade } from '../../auth/state/auth.facade';
import { SideMenuFacade } from '../state/side-menu.facade';
import { NavFacade } from '../state/nav.facade';
import { Router } from '@angular/router';

@Component({
  selector: "app-toolbar",
  standalone: true,
  imports: [CommonModule, ButtonComponent, FaIconComponent, SideMenuComponent],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly sideMenuFacade = inject(SideMenuFacade);
  private readonly navFacade = inject(NavFacade);
  private readonly router = inject(Router);
  authenticated = this.authFacade.authenticated();
  sideMenuOpen = this.sideMenuFacade.isOpen();
  backButtonPath = this.navFacade.backButtonPath();

  onOpenMenu() {
    this.sideMenuFacade.open();
  }

  protected readonly faBars = faBars;

  onGoBack() {
    this.router.navigateByUrl(this.backButtonPath());
  }

  protected readonly faArrowLeft = faArrowLeft;
}
