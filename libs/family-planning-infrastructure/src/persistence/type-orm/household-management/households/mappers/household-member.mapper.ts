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
    return new HouseholdMember(
      HouseholdMemberId.fromString(entity.id),
      new UserId(entity.userId),
      HouseholdId.fromString(entity.householdId),
      new LastName(entity.lastName),
      new FirstName(entity.firstName),
      new Email(entity.email),
    );
  }
}
