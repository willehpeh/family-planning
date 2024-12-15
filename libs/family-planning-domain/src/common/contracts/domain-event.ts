export interface DomainEvent {
  eventName(): string;
  occurredOn(): Date;
}
