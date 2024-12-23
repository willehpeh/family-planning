import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { ScaffoldingComponent } from '../layout/scaffolding/scaffolding.component';
import { Store } from '@ngrx/store';
import { selectMyHouseholdName } from '../households/state/households.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardsContainerComponent, ScaffoldingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dashboardTitle: Signal<string>;
  private store = inject(Store);
  private householdName: Signal<string>;

  constructor() {
    this.householdName = this.store.selectSignal(selectMyHouseholdName);
    this.dashboardTitle = computed(() => `${ this.householdName().toLocaleUpperCase() } COMMAND CENTRE`);
  }
}
