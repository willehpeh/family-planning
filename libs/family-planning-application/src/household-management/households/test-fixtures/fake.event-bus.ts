import { DomainEvent, EventBus } from '@family-planning/domain';
import { Observable, Subject } from 'rxjs';

export class FakeEventBus implements EventBus {

  events: DomainEvent[] = [];
  events$: Observable<DomainEvent>;

  private _events$: Subject<DomainEvent> = new Subject<DomainEvent>();

  constructor() {
    this.events$ = this._events$.asObservable();
  }

  publish(event: DomainEvent): Promise<void> {
    this.events.push(event);
    return Promise.resolve();
  }

  emitEvent(event: DomainEvent): void {
    this._events$.next(event);
  }
}
