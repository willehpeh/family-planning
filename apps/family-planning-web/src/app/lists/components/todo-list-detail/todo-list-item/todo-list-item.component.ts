import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../../../../ui-elements/checkbox/checkbox.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { concat, debounceTime, delay, filter, map, Observable, of, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoListItemReadModel } from '@family-planning/domain';

@Component({
  selector: 'app-todo-list-item',
  imports: [
    CommonModule,
    CheckboxComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listItem', [
      state('in', style({ transform: 'scaleY(1)' })),
      state('out', style({ transform: 'scaleY(0)' })),
      transition('void => *', [
        style({ transform: 'scaleY(0)' }),
        animate('0.3s ease-in-out')
      ]),
      transition('* => out', [
        animate('0.3s ease-in-out')
      ])
    ])
  ],
  template: `
		<div class="bg-black bg-opacity-60 p-6 m-auto max-w-screen-md rounded-md flex gap-6 items-center"
				 [tabIndex]="tabIndex()"
				 [@listItem]="animationState$ | async">
			<app-checkbox [checked]="checkboxChecked" (valueChange)="onToggleItem($event)"/>
			<p [class.italic]="item().done" [class.line-through]="item().done">{{ item().name }}</p>
		</div>
  `
})
export class TodoListItemComponent implements OnInit {
  item = input.required<TodoListItemReadModel>();
  tabIndex = input.required<number>();

  itemMarkedAsDone = output<string>();
  doneItemMarkedAsPending = output<string>();

  checkboxChecked = false;
  animationState$: Observable<'in' | 'out'>;

  private readonly _checked$ = new Subject<boolean>;

  constructor() {
    const checkedChanged$ = this.debouncedStatusChange();
    this.animationState$ = this.triggerAnimationOnStatusChange(checkedChanged$);
    this.emitStatusChangeAfterAnimationFinished(checkedChanged$);
  }

  ngOnInit(): void {
    this.setCheckboxStatus(this.item().done);
  }

  onToggleItem(checked: boolean): void {
    this.setCheckboxStatus(!this.checkboxChecked);
    this._checked$.next(checked);
  }

  /**
   * Allow user time to see status change and correct if mistake
   * @private
   */
  private debouncedStatusChange() {
    return this._checked$.pipe(
      debounceTime(500),
      filter(checked => this.statusChanged(checked)),
    );
  }

  private triggerAnimationOnStatusChange(checkedChanged$: Observable<boolean>) {
    return concat(
      of('in' as const),
      checkedChanged$.pipe(
        map(() => 'out' as const)
      )
    );
  }

  private emitStatusChangeAfterAnimationFinished(checkedChanged$: Observable<boolean>) {
    checkedChanged$.pipe(
      takeUntilDestroyed(),
      delay(320), // allow animation to complete
      tap(checked => checked ? this.markItemAsDone() : this.markDoneItemAsPending())
    ).subscribe();
  }

  private statusChanged(checked: boolean) {
    return checked !== this.item().done;
  }

  private setCheckboxStatus(done: boolean) {
    this.checkboxChecked = done;
  }

  private markDoneItemAsPending() {
    this.doneItemMarkedAsPending.emit(this.item().id);
  }

  private markItemAsDone() {
    this.itemMarkedAsDone.emit(this.item().id);
  }
}
