import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { Store } from '@ngrx/store';
import { selectMyHouseholdName } from '../households/state/households.selectors';

@Component({
  selector: 'app-command-centre',
  standalone: true,
  imports: [CommonModule, CardsContainerComponent],
  templateUrl: './command-centre.component.html',
  styleUrl: './command-centre.component.scss',
})
export class CommandCentreComponent {
  commandCentreTitle: Signal<string>;
  private store = inject(Store);
  private householdName: Signal<string>;

  constructor() {
    this.householdName = this.store.selectSignal(selectMyHouseholdName);
    this.commandCentreTitle = computed(() => `${ this.householdName().toLocaleUpperCase() } COMMAND CENTRE`);
  }
}
