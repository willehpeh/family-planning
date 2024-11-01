import { EntitySnapshot } from './entity-snapshot';

export interface Entity<T extends EntitySnapshot> {
  snapshot(): T;
}
