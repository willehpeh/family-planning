import { ListItem } from "./list-item";
import { ListName } from "../value-objects";
import { ListType, ListTypeString } from '../value-objects';

export class List {
  private readonly _name: ListName;
  private readonly _items: ListItem[] = [];
  private readonly _type: ListType;

  constructor(name: string, type: ListTypeString) {
    this._name = new ListName(name);
    this._type = new ListType(type);
  }

  name(): string {
    return this._name.value();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  type(): ListTypeString {
    return this._type.value();
  }
}
