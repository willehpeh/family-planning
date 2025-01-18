import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClearBackButton, SetBackButtonPath } from './ui/ui.actions';
import { selectBackButtonPath } from './ui/ui.selectors';

@Injectable({
  providedIn: 'root'
})
export class NavFacade {
  private readonly store = inject(Store);

  backButtonPath(): Signal<string> {
    return this.store.selectSignal(selectBackButtonPath);
  }

  clearBackButton(): void {
    this.store.dispatch(ClearBackButton());
  }

  setBackButtonPath(path: string): void {
    this.store.dispatch(SetBackButtonPath({ path }));
  }
}
