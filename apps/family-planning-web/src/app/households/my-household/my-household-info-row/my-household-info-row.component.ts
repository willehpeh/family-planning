import { Component, input } from '@angular/core';

@Component({
  selector: 'app-my-household-info-row',
  standalone: true,
  template: `
		<div class="flex flex-col md:flex-row justify-center md:gap-6 mb-6">
      <p class="text-left w-full md:w-1/3 font-bold">{{ label() }}:</p>
      <div class="flex-1 text-left">
        <ng-content/>
      </div>
		</div>
  `
})
export class MyHouseholdInfoRowComponent {
  label = input.required<string>();
}
