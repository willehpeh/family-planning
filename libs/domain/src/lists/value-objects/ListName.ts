import { ValueObject } from '../../common/value-object';

export class ListName implements ValueObject<string> {

  private readonly _listName: string;

  constructor(listName: string) {
    this._listName = listName;
  }

  value(): string {
    return this._listName;
  }

  equals(other: ListName): boolean {
    return this._listName === other._listName;
  }
}
