import { Household, HouseholdId, HouseholdMemberId, HouseholdName } from '@family-planning/domain';
import { Household as HouseholdEntity } from '../entities/household.entity';

export class HouseholdMapper {
  static toPersistence(household: Household): HouseholdEntity {
    const snapshot = household.snapshot();
    return {
      id: snapshot.id(),
      name: snapshot.name(),
      memberIds: snapshot.memberIds(),
    };
  }

  static toDomain(entity: HouseholdEntity): Household {
    return new Household(
      HouseholdId.fromString(entity.id),
      new HouseholdName(entity.name),
      entity.memberIds.map(id => HouseholdMemberId.fromString(id)),
    );
  }
}
