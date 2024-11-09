import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  template: `
		<button class="bg-amber-300 py-1 px-4 hover:bg-amber-200 active:translate-x-0.5 active:translate-y-0.5 text-gray-900"
						(click)="onClick($event)"
            [disabled]="disabled()"
    >
			<ng-content/>
		</button>
  `
})
export class ButtonComponent {

  disabled = input<boolean>(false);
  click = output<MouseEvent>();

  onClick($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.click.emit($event);
  }
}
