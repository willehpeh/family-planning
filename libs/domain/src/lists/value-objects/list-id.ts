import { ValueObject } from '../../common';

export class ListId implements ValueObject<string> {

  constructor(private readonly _id: string) {}

  equals(other: ListId): boolean {
    return this._id === other._id;
  }

  value(): string {
    return this._id;
  }

}
