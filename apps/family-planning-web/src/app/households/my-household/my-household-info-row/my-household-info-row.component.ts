import { Component, input } from '@angular/core';

@Component({
  selector: 'app-my-household-info-row',
  standalone: true,
  template: `
		<div class="flex justify-center gap-6 mb-3">
      <p class="text-right flex-1 font-bold">{{ label() }}:</p>
      <div class="flex-1 text-left">
        <ng-content/>
      </div>
		</div>
  `
})
export class MyHouseholdInfoRowComponent {
  label = input.required<string>();
}
