import { Household, HouseholdReadModel, HouseholdRepository } from '@family-planning/domain';
import { OrmHouseholdEntity as HouseholdEntity } from '../entities/household.entity';
import { Repository } from 'typeorm';
import { HouseholdMapper } from '../mappers/household.mapper';

export class OrmHouseholdRepository implements HouseholdRepository {

  constructor(private readonly householdRepository: Repository<HouseholdEntity>) {
  }

  async save(household: Household): Promise<void> {
    const entity = HouseholdMapper.toPersistence(household);
    await this.householdRepository.save(entity);
  }

  async findByUserId(userId: string): Promise<HouseholdReadModel | null> {
    return this.householdRepository.findOne({ relations: ['members'], where: { members: { userId } } });
  }

  async findById(householdId: string): Promise<Household> {
    const entity = await this.householdRepository.findOne({ where: { id: householdId } });
    if (!entity) {
      throw new Error('Household not found');
    }
    return HouseholdMapper.toDomain(entity);
  }

}
