import { Observable, Subject } from 'rxjs';
import { DomainEvent } from '@family-planning/domain';

export class FakeEventStream {
  events$: Observable<DomainEvent>;

  private _events$: Subject<DomainEvent> = new Subject<DomainEvent>();

  constructor() {
    this.events$ = this._events$.asObservable();
  }

  publish(event: DomainEvent): void {
    this._events$.next(event);
  }
}
