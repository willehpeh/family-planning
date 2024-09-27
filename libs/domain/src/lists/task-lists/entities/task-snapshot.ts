import { EntitySnapshot } from '../../../common';

export class TaskSnapshot implements EntitySnapshot {
  constructor(private _id: string) {}

  id(): string {
    return this._id;
  }
}
