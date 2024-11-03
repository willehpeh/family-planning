import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { Store } from '@ngrx/store';
import { selectDisclaimerSeen } from './state/disclaimer.selectors';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, DisclaimerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  disclaimerSeen: Signal<boolean>;

  constructor() {
    const store = inject(Store);
    const router = inject(Router);
    this.disclaimerSeen = store.selectSignal(selectDisclaimerSeen);
    if (!this.disclaimerSeen()) {
      router.navigate(['/disclaimer']);
    }
  }
}
