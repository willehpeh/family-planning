import { EntitySnapshot } from './entity-snapshot';

export interface Entity {
  snapshot(): EntitySnapshot;
  is(other: Entity): boolean;
}
