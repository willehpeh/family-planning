import { ListItem } from './ListItem';
import { ListName } from './ListName';

export class List {

  private readonly _name: ListName;
  private readonly _items: ListItem[] = [];

  constructor(name: string) {
    this._name = new ListName(name);
  }

  name(): string {
    return this._name.value();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }
}
