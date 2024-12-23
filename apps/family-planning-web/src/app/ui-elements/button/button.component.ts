import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  template: `
		<button (click)="onClick($event)"
						[disabled]="disabled()"
						[ngClass]="classes()"
		>
			<ng-content/>
		</button>
  `
})
export class ButtonComponent {

  disabled = input<boolean>(false);
  click = output<MouseEvent>();
  buttonStyle = input<'primary' | 'secondary' | 'outline'>('primary');
  primary = computed(() => this.buttonStyle() === 'primary');
  secondary = computed(() => this.buttonStyle() === 'secondary');
  outline = computed(() => this.buttonStyle() === 'outline');
  classes = computed(() => ({
    'py-1': true,
    'px-4': true,
    'box-border': true,
    'border-2': true,
    'text-gray-900': this.primary(),
    'bg-amber-300': this.primary() && !this.disabled(),
    'border-amber-300': this.primary() && !this.disabled(),
    'hover:bg-amber-200': this.primary() && !this.disabled(),
    'bg-amber-800': this.primary() && this.disabled(),
    'border-amber-800': this.primary() && this.disabled(),
    'bg-transparent': this.outline(),
    'border-blue-300': this.outline() && !this.disabled(),
    'hover:bg-gray-900': this.outline() && !this.disabled(),
    'active:translate-x-0.5': !this.disabled(),
    'active:translate-y-0.5': !this.disabled(),
    'italic': this.disabled()
  }));

  onClick($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.click.emit($event);
  }
}
