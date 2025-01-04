import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  template: `
		<label class="block">
			<input type="checkbox" class="hidden" [checked]="checked()" (change)="onChange()"/>
			<span class="w-4 h-4 border-2 border-blue-300 flex items-center justify-center"
						[class.bg-blue-300]="checked()"></span>
		</label>`
})
export class CheckboxComponent {
  checked = input.required<boolean>();
  change = output<boolean>();

  onChange() {
    this.change.emit(!this.checked());
  }
}
