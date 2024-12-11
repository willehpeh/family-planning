import {
  Email,
  FirstName,
  HouseholdId,
  HouseholdMember,
  HouseholdMemberId,
  LastName,
  UserId
} from '@family-planning/domain';
import { HouseholdMember as HouseholdMemberEntity } from '../entities/household-member.entity';

export class HouseholdMemberMapper {
  static toPersistence(member: HouseholdMember): HouseholdMemberEntity {
    const snapshot = member.snapshot();
    return {
      id: snapshot.id(),
      userId: snapshot.userId(),
      lastName: snapshot.lastName(),
      firstName: snapshot.firstName(),
      email: snapshot.email(),
      householdId: snapshot.householdId(),
    };
  }

  static toDomain(entity: HouseholdMemberEntity): HouseholdMember {
    return new HouseholdMember({
      id: HouseholdMemberId.fromString(entity.id),
      userId: new UserId(entity.userId),
      householdId: HouseholdId.fromString(entity.householdId),
      lastName: new LastName(entity.lastName),
      firstName: new FirstName(entity.firstName),
      email: new Email(entity.email),
    });
  }
}
