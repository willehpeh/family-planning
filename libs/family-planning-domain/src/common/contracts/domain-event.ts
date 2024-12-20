export abstract class DomainEvent {
  abstract eventName(): string;
  abstract occurredOn(): Date;
}

export const isDomainEvent = (event: unknown): event is DomainEvent => {
  return typeof event === 'object' &&
    typeof (event as DomainEvent).eventName === 'function' &&
    typeof (event as DomainEvent).occurredOn === 'function' &&
    typeof (event as DomainEvent).eventName() === 'string' &&
    (event as DomainEvent).occurredOn() instanceof Date;
}
