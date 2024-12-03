import { Household, HouseholdMemberRepository, HouseholdReadModel, HouseholdRepository } from '@family-planning/domain';
import { Household as HouseholdEntity } from '../entities/household.entity';
import { Repository } from 'typeorm';
import { HouseholdMapper } from '../mappers/household.mapper';

export class OrmHouseholdRepository implements HouseholdRepository {

  constructor(private readonly householdRepository: Repository<HouseholdEntity>,
              private readonly householdMemberRepository: HouseholdMemberRepository) {
  }

  async save(household: Household): Promise<void> {
    const entity = HouseholdMapper.toPersistence(household);
    await this.householdRepository.save(entity);
  }

  async findByUserId(userId: string): Promise<HouseholdReadModel | null> {
    const member = await this.householdMemberRepository.findByUserId(userId);
    if (!member) {
      return Promise.resolve(null);
    }
    return this.householdRepository.findOne({ where: { id: member.householdId } });
  }



}
