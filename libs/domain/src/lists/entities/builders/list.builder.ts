import { List } from '../list';

export class ListBuilder {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  build(): List {
    return new List(this._name);
  }
}
