import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: "app-card",
    imports: [CommonModule],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss"
})
export class CardComponent {
  clickable = input<boolean>(false);
  borderColor = input<string>('blue');
  styleClasses = computed(() => {
    const borderClassName = `border-${this.borderColor()}-300`;
    const clickableBorderClassName = `hover:border-${this.borderColor()}-500`;

    return {
      [borderClassName]: true,
      [clickableBorderClassName]: this.clickable(),
      'cursor-pointer': this.clickable(),
      'hover:bg-gray-900': this.clickable(),
      'hover:bg-opacity-60': this.clickable(),
      'active:bg-gray-800': this.clickable(),
      'active:bg-opacity-60': this.clickable(),
    };
  });
}
