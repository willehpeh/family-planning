import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { HeaderComponent } from '../layout/header/header.component';
import { Store } from '@ngrx/store';
import { selectHouseholdName } from '../auth/state/auth.selectors';

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, CardsContainerComponent, HeaderComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  private store = inject(Store);
  private householdName: Signal<string>;
  dashboardTitle: Signal<string>;

  constructor() {
    this.householdName = this.store.selectSignal(selectHouseholdName);
    this.dashboardTitle = computed(() => `${this.householdName().toLocaleUpperCase()} COMMAND CENTRE`);
  }
}
