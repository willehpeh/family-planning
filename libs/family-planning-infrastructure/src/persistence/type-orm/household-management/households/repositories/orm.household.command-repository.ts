import { Household, HouseholdCommandRepository } from '@family-planning/domain';
import { Household as HouseholdEntity } from '../entities/household.entity';
import { Repository } from 'typeorm';
import { HouseholdMapper } from '../mappers/household.mapper';

export class OrmHouseholdCommandRepository implements HouseholdCommandRepository {

  constructor(private readonly householdRepository: Repository<HouseholdEntity>) {}

  async save(household: Household): Promise<void> {
    const entity = HouseholdMapper.toPersistence(household);
    await this.householdRepository.save(entity);
  }

}
