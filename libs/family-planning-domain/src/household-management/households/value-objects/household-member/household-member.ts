import { ValueObject } from '../../../../common';

export class HouseholdMember implements ValueObject<unknown> {
  equals(other: HouseholdMember): boolean {
    return false;
  }

  value(): unknown {
    return undefined;
  }

}
