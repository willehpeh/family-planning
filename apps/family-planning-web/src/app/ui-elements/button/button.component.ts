import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  template: `
		<button class="py-1 px-4 text-gray-900"
						(click)="onClick($event)"
            [disabled]="disabled()"
            [ngClass]="interactionClasses()"
    >
			<ng-content/>
		</button>
  `
})
export class ButtonComponent {

  disabled = input<boolean>(false);
  click = output<MouseEvent>();
  interactionClasses = computed(() => ({
    'bg-amber-300': !this.disabled(),
    'hover:bg-amber-200': !this.disabled(),
    'active:translate-x-0.5': !this.disabled(),
    'active:translate-y-0.5': !this.disabled(),
    'bg-amber-800': this.disabled(),
    'italic': this.disabled()
  }));

  onClick($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.click.emit($event);
  }
}
