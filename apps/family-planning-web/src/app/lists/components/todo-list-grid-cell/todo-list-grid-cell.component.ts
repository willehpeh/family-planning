import { Component, computed, HostBinding, input } from '@angular/core';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-list-grid-cell',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass
  ],
  template: `
		<div class="bg-black bg-opacity-60 
		              rounded-lg border-2 
		              text-center box-border
		              cursor-pointer p-3
		              w-full h-full
		              hover:bg-gray-900
		              active:bg-gray-800"
				 [title]="listName()"
         [ngClass]="colorClasses()"
    >
			<fa-icon [icon]="icon()" size="2x"/>
			<h2 class="mt-2"
          [class.text-amber-300]="highlight()">
        {{ shortenedListName() }}
      </h2>
		</div>
  `,
})
export class TodoListGridCellComponent {
  listName = input.required<string>();
  highlight = input<boolean>();
  icon = input<IconDefinition>(faListCheck);
  shortenedListName = computed(() => this.listName().length <= 10 ? this.listName() :`${this.listName().slice(0, 10)}...`);

  protected readonly colorClasses = computed(() => {
    return {
      'border-blue-300': !this.highlight(),
      'hover:border-blue-500': !this.highlight(),
      'active:bg-blue-800': !this.highlight(),
      'border-amber-300': this.highlight(),
      'hover:border-amber-500': this.highlight(),
      'active:bg-amber-800': this.highlight(),
    };
  });

  @HostBinding('class') get hostClasses() {
    return 'w-1/3 max-w-36 aspect-square';
  }
}
