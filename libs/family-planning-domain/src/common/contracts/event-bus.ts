import { DomainEvent } from './domain-event';

export abstract class EventBus {
  abstract publish(event: DomainEvent): Promise<void>;
}
