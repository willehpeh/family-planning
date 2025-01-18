import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  template: `
		<label class="flex items-center gap-3 w-fit cursor-pointer">
			<input type="checkbox" class="hidden" [checked]="checked()" (change)="onChange()"/>
      <span>{{ label() }}</span>
			<span class="w-4 h-4 border-2 border-blue-300 flex items-center justify-center"
						[class.bg-blue-300]="checked()"></span>
		</label>`
})
export class CheckboxComponent {
  checked = input.required<boolean>();
  label = input<string>('');
  valueChange = output<boolean>();

  onChange() {
    this.valueChange.emit(!this.checked());
  }
}
