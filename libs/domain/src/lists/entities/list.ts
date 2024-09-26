import { Entity } from '../../common';

export interface List extends Entity {
  isEmpty(): boolean;
}
