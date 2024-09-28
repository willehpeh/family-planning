import { ValueObject } from '../../../common';

export class TaskCreatedAt implements ValueObject<string> {

  private readonly _value: string;

  constructor(_createdAt?: string) {
    if (!_createdAt) {
      this._value = new Date().toISOString().split('T')[0];
      return;
    }
    this._value = _createdAt;
  }

  value(): string {
    return this._value;
  }

  equals(other: TaskCreatedAt): boolean {
    return this._value === other.value();
  }
}
