import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseholdMemberInfo } from '../../models/household-member-info';

@Component({
  selector: 'app-my-household-member-list',
  standalone: true,
  imports: [CommonModule],
  template: `
		<ul>
			@for (member of members(); track member.id) {
				<li class="mb-3 ml-3 md:ml-0">{{ member.firstName }} {{ member.lastName }}<br>{{ member.email }}</li>
			}
		</ul>
  `
})
export class MyHouseholdMemberListComponent {
  members = input<HouseholdMemberInfo[]>();
}
