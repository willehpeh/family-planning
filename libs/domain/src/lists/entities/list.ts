import { Entity } from '../../common';

export interface List extends Entity {
  is(other: List): boolean;
}
