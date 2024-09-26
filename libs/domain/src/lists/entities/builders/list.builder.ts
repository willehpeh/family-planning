import { List } from "../list";
import { ListTypeString } from "../../value-objects";

export class ListBuilder {
  private readonly _name: string;
  private readonly _type: ListTypeString;

  constructor(name: string, type: ListTypeString) {
    this._name = name;
    this._type = type;
  }

  build(): List {
    return new List(this._name, this._type);
  }
}
