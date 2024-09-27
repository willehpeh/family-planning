import { EntitySnapshot } from '../../../../common';

export class TaskSnapshot implements EntitySnapshot {
  constructor(private _id: string,
              private _name: string) {
  }

  id(): string {
    return this._id;
  }

  name(): string {
    return this._name;
  }
}
