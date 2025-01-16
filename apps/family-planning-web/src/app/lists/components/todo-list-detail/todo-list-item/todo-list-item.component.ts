import { ChangeDetectionStrategy, Component, computed, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerializedTodoListItem } from '../../../models/serialized-todo-list-item';
import { CheckboxComponent } from '../../../../ui-elements/checkbox/checkbox.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { concat, debounceTime, delay, filter, map, Observable, of, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
  ],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listItem', [
      state('out', style({ transform: 'scaleY(0)' })),
      state('in', style({ transform: 'scaleY(1)' })),
      transition('void => *', [
        style({ transform: 'scaleY(0)' }),
        animate('0.3s ease-in-out')
      ]),
      transition('* => out', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class TodoListItemComponent implements OnInit {
  item = input.required<SerializedTodoListItem>();
  itemName = computed(() => this.item().name);
  itemDone = computed(() => this.item().done);
  done = false;
  animationState$: Observable<'in' | 'out'>;
  tabIndex = input.required<number>();

  itemMarkedAsDone = output<string>();
  doneItemMarkedAsPending = output<string>();

  private readonly _checked$ = new Subject<boolean>;

  constructor() {
    const checkedChanged$ = this._checked$.pipe(
      debounceTime(500),
      filter(checked => checked !== this.itemDone()),
    );
    this.animationState$ = concat(
      of('in' as const),
      checkedChanged$.pipe(
        map(() => 'out' as const)
      )
    );
    checkedChanged$.pipe(
      takeUntilDestroyed(),
      delay(320),
      tap(checked => this.emitItemStatus(checked))
    ).subscribe();
  }

  ngOnInit(): void {
    this.done = this.item().done;
  }

  onToggleItem(checked: boolean): void {
    this.done = !this.done;
    this._checked$.next(checked);
  }

  private emitItemStatus(checked: boolean) {
    if (checked) {
      this.itemMarkedAsDone.emit(this.item().id);
      return;
    }
    this.doneItemMarkedAsPending.emit(this.item().id);
  }
}
