import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
})
export class CardComponent {
  clickable = input<boolean>(false);
  clickableClasses = computed(() => this._clickableClasses.reduce((obj, cls) => ({
    ...obj,
    [cls]: this.clickable()
  }), {}));

  private _clickableClasses = [
    'cursor-pointer',
    'hover:bg-gray-900',
    'hover:bg-opacity-60',
    'hover:border-blue-500',
    'active:bg-gray-800',
    'active:bg-opacity-60'
  ];

}
