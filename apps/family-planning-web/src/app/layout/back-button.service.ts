import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';
import { SetBackButtonPath } from './state/ui/ui.actions';
import { filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  private store = inject(Store);
  private router = inject(Router);
  backButtonPathsForRoutes: Record<string, string> = {};

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(event => {
        this.setBackButtonPathForRoute(event.url);
      })
    ).subscribe();
  }

  private setBackButtonPathForRoute(route: string) {
    this.store.dispatch(SetBackButtonPath({ path: this.backButtonPathForRoute(route) }));
  }

  private backButtonPathForRoute(route: string): string {
    if (this.backButtonPathsForRoutes[route]) {
      return this.backButtonPathsForRoutes[route];
    }
    return '';
  }
}
