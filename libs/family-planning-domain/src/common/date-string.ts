import { ValueObject } from '.';

export class DateString implements ValueObject<string> {

  private readonly dateString: string;

  constructor(date: Date) {
    if (date.toString() === 'Invalid Date') {
      throw new Error('Invalid date');
    }
    this.dateString = date.toISOString().split('T')[0];
  }

  static now(): DateString {
    return new DateString(new Date());
  }

  equals(other: DateString): boolean {
    return this.value() === other.value();
  }

  value(): string {
    return this.dateString;
  }

}
