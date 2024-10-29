export interface ValueObject<T> {
  value(): T;
  equals(other: ValueObject<T>): boolean;
}
