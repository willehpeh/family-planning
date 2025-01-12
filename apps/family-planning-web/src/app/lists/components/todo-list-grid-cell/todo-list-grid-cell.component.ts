import { Component, computed, input } from '@angular/core';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-list-grid-cell',
  standalone: true,
  imports: [
    FaIconComponent,
  ],
  template: `
		<div [title]="listName()"
         [class]="classes()"
    >
			<fa-icon [icon]="icon()" size="2x" />
			<h2
          [class.text-amber-300]="highlight()">
        {{ listName() }}
      </h2>
		</div>
  `,
})
export class TodoListGridCellComponent {
  listName = input.required<string>();
  highlight = input<boolean>(false);
  icon = input<IconDefinition>(faListCheck);
  index = input<number>(0);

  protected readonly classes = computed(() => {

    const baseClasses = 'bg-black bg-opacity-60 border-2 rounded-lg flex gap-6 items-center box-border cursor-pointer p-3 w-full max-w-screen-md m-auto';

    const borderColors = this.highlight() ?
      'border-amber-300 hover:border-amber-500 active:bg-amber-800' :
      'border-blue-300 hover:border-blue-500 active:bg-blue-800';

    const topBorder = this.index() !== 0 ? 'border-t-0' : '';

    return [baseClasses, borderColors, topBorder].join(' ');
  });
}
