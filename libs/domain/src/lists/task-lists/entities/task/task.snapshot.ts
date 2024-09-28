import { EntitySnapshot } from '../../../../common';

export class TaskSnapshot implements EntitySnapshot {
  constructor(private _id: string,
              private _name: string,
              private _status: string) {
  }

  id(): string {
    return this._id;
  }

  name(): string {
    return this._name;
  }

  status(): string {
    return this._status;
  }
}
