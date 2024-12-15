import {
  Email,
  FirstName,
  Household, HouseholdId, HouseholdMemberId,
  HouseholdMemberRepository, HouseholdName,
  HouseholdReadModel,
  HouseholdRepository,
  HouseholdSnapshot, LastName, UserId
} from '@family-planning/domain';
import { InMemoryHouseholdMemberRepository } from './in-memory.household-member.repository';

export class InMemoryHouseholdRepository implements HouseholdRepository {

  private _households: HouseholdSnapshot[] = [];

  constructor(private readonly householdMemberRepository: HouseholdMemberRepository = new InMemoryHouseholdMemberRepository()) {}

  households() {
    return this._households;
  }

  save(householdToSave: Household): Promise<void> {
    const snapshot = householdToSave.snapshot();
    const found = this._households.find(household => household.id() === snapshot.id());
    if (found) {
      this._households = this._households.map(household => {
        if (household.id() === snapshot.id()) {
          return snapshot;
        }
        return household;
      });
      return Promise.resolve();
    }
    this._households.push(householdToSave.snapshot());
    return Promise.resolve();
  }

  async findByUserId(id: string): Promise<HouseholdReadModel> {
    const member = await this.householdMemberRepository.findByUserId(id);
    if (!member) {
      throw new Error('Member not found');
    }
    const household = this._households.find(household => household.memberIds().includes(member.id));
    if (!household) {
      throw new Error('Household not found');
    }
    return Promise.resolve({
      id: household.id(),
      name: household.name(),
    });
  }

  async findById(id: string): Promise<Household> {
    const household = this._households.find(household => household.id() === id);
    if (!household) {
      throw new Error('Household not found');
    }
    return Household.householdWithMembers({
      id: HouseholdId.fromString(household.id()),
      name: new HouseholdName(household.name()),
    }, household.members().map(member => ({
      id: HouseholdMemberId.fromString(member.id()),
      userId: new UserId(member.userId()),
      lastName: new LastName(member.lastName()),
      firstName: new FirstName(member.firstName()),
      email: new Email(member.email()),
    })));
  }

  withSnapshots(snapshots: HouseholdSnapshot[]): InMemoryHouseholdRepository {
    this._households = snapshots;
    return this;
  }
}
