import {
  Email,
  FirstName,
  Household,
  HouseholdId,
  HouseholdMemberId,
  HouseholdMemberSnapshot,
  HouseholdName,
  HouseholdSnapshot,
  LastName, PendingHouseholdMember,
  UserId
} from '@family-planning/domain';
import { OrmHouseholdEntity } from '../entities/household.entity';
import { OrmHouseholdMemberEntity } from '../entities/household-member.entity';

export class HouseholdMapper {
  static toPersistence(household: Household): OrmHouseholdEntity {
    const snapshot = household.snapshot();
    return this.ormHouseholdFromSnapshot(snapshot);
  }

  static toDomain(entity: OrmHouseholdEntity): Household {
    return Household.create({
        id: HouseholdId.fromString(entity.id),
        name: new HouseholdName(entity.name),
      },
      entity.members.map(ormMember => this.memberFromOrmEntity(ormMember)),
      entity.pendingMembers.map(member => new PendingHouseholdMember({
        householdId: HouseholdId.fromString(member.householdId),
        id: HouseholdMemberId.fromString(member.id),
        lastName: new LastName(member.lastName),
        firstName: new FirstName(member.firstName),
        email: new Email(member.email)
      }))
    );
  }

  private static ormHouseholdFromSnapshot(snapshot: HouseholdSnapshot) {
    const entity = new OrmHouseholdEntity();
    entity.id = snapshot.id();
    entity.name = snapshot.name();
    entity.memberIds = snapshot.memberIds();
    entity.members = snapshot.members()
      .map(member => this.ormMemberFromSnapshot(member, entity));
    entity.pendingMembers = snapshot.pendingMembers();
    return entity;
  }

  private static ormMemberFromSnapshot(member: HouseholdMemberSnapshot, entity: OrmHouseholdEntity) {
    const memberEntity = new OrmHouseholdMemberEntity();
    memberEntity.id = member.id();
    memberEntity.userId = member.userId();
    memberEntity.lastName = member.lastName();
    memberEntity.firstName = member.firstName();
    memberEntity.email = member.email();
    memberEntity.household = entity;
    return memberEntity;
  }

  private static memberFromOrmEntity({ id, userId, lastName, firstName, email }: OrmHouseholdMemberEntity) {
    return {
      id: HouseholdMemberId.fromString(id),
      userId: new UserId(userId),
      lastName: new LastName(lastName),
      firstName: new FirstName(firstName),
      email: new Email(email),
    };
  }
}
