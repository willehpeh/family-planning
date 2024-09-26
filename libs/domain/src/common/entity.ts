import { EntitySnapshot } from './entity-snapshot';

export interface Entity {
  snapshot(): EntitySnapshot;
}
