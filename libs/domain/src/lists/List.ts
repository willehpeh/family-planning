import { ListItem } from './ListItem';

export class List {

  private readonly _items: ListItem[] = [];

  constructor(private _name: string) {}

  name(): string {
    return this._name;
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }
}
