import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAuthenticated } from '../../auth/state/auth.selectors';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { OpenSideMenu } from '../state/ui/ui.actions';

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, ButtonComponent, FaIconComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  title = input<string>();
  private readonly store = inject(Store);
  authenticated = this.store.selectSignal(selectAuthenticated);

  onOpenMenu() {
    this.store.dispatch(OpenSideMenu());
  }

  protected readonly faBars = faBars;
}
