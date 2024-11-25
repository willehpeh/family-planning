import { HouseholdCommandRepository } from "@family-planning/domain";

export class InMemoryHouseholdCommandRepository implements HouseholdCommandRepository {

  households() {
    return [{ name: 'newHouseholdName' }];
  }
}
