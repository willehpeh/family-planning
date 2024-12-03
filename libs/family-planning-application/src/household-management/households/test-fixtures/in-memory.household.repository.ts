import {
  Household,
  HouseholdMemberRepository,
  HouseholdReadModel,
  HouseholdRepository,
  HouseholdSnapshot
} from '@family-planning/domain';
import { InMemoryHouseholdMemberRepository } from './in-memory.household-member.repository';

export class InMemoryHouseholdRepository implements HouseholdRepository {

  private _households: HouseholdSnapshot[] = [];

  constructor(private readonly householdMemberRepository: HouseholdMemberRepository = new InMemoryHouseholdMemberRepository()) {}

  households() {
    return this._households;
  }

  save(household: Household): Promise<void> {
    this._households.push(household.snapshot());
    return Promise.resolve();
  }

  findByMemberId(id: string): Promise<HouseholdReadModel> {
    const household = this._households.find(household => household.memberIds().includes(id));
    if (!household) {
      throw new Error('Household not found!');
    }
    return Promise.resolve({
      id: household.id(),
      name: household.name()
    });
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

  withSnapshots(snapshots: HouseholdSnapshot[]): InMemoryHouseholdRepository {
    this._households = snapshots;
    return this;
  }
}
