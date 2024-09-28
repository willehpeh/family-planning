import { EntitySnapshot } from '../../../../common';

export class TaskSnapshot implements EntitySnapshot {
  constructor(private _id: string,
              private _name: string,
              private _status: string,
              private _createdAt: string) {
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

  createdAt(): string {
    return this._createdAt;
  }
}
