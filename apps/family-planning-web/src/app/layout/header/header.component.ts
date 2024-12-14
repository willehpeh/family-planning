import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Store } from '@ngrx/store';
import { selectAuthenticated } from '../../auth/state/auth.selectors';
import { Logout } from '../../auth/state/auth.actions';
import { ButtonComponent } from '../../ui-elements/button/button.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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

  onLogout() {
    this.store.dispatch(Logout());
  }

  protected readonly faRightFromBracket = faRightFromBracket;
}
