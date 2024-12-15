import { DomainEvent } from './domain-event';

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
}
