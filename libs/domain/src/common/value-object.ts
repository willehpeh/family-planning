export interface ValueObject<T> {
  value(): T;
  equals(other: this): boolean;
}
