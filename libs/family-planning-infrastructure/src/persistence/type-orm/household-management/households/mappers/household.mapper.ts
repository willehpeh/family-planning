import {
  Email,
  FirstName,
  Household,
  HouseholdId,
  HouseholdMemberId,
  HouseholdName,
  LastName,
  UserId
} from '@family-planning/domain';
import { OrmHouseholdEntity } from '../entities/household.entity';
import { OrmHouseholdMemberEntity } from '../entities/household-member.entity';

export class HouseholdMapper {
  static toPersistence(household: Household): OrmHouseholdEntity {
    const snapshot = household.snapshot();
    const entity = new OrmHouseholdEntity();
    entity.id = snapshot.id();
    entity.name = snapshot.name();
    entity.memberIds = snapshot.memberIds();
    entity.members = snapshot.members().map(member => {
      const memberEntity = new OrmHouseholdMemberEntity();
      memberEntity.id = member.id();
      memberEntity.userId = member.userId();
      memberEntity.lastName = member.lastName();
      memberEntity.firstName = member.firstName();
      memberEntity.email = member.email();
      memberEntity.household = entity;
      return memberEntity;
    });
    return entity;
  }

  static toDomain(entity: OrmHouseholdEntity): Household {
    return Household.householdWithMembers({
      id: HouseholdId.fromString(entity.id),
      name: new HouseholdName(entity.name),
    }, entity.members.map(member => {
      return {
        id: HouseholdMemberId.fromString(member.id),
        userId: new UserId(member.userId),
        lastName: new LastName(member.lastName),
        firstName: new FirstName(member.firstName),
        email: new Email(member.email),
      };
    }));
  }
}
