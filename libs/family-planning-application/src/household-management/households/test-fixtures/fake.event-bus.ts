import { DomainEvent, EventBus } from '@family-planning/domain';

export class FakeEventBus implements EventBus {

  events: DomainEvent[] = [];

  publish(event: DomainEvent): Promise<void> {
    this.events.push(event);
    return Promise.resolve();
  }
}
