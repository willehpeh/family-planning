import { DomainEvent } from '.';

export interface EventAggregate {
  events(): DomainEvent[];
  clearEvents(): void;
}
