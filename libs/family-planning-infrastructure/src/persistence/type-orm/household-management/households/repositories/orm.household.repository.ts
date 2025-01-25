import { Household, HouseholdReadModel, HouseholdRepository } from '@family-planning/domain';
import { OrmHouseholdEntity } from '../entities/household.entity';
import { Repository } from 'typeorm';
import { HouseholdMapper } from '../mappers/household.mapper';
import { OrmHouseholdMemberEntity } from '../entities/household-member.entity';

export class OrmHouseholdRepository implements HouseholdRepository {

  constructor(private readonly householdRepository: Repository<OrmHouseholdEntity>,
              private readonly memberRepository: Repository<OrmHouseholdMemberEntity>) {
  }

  async save(household: Household): Promise<void> {
    const entity = HouseholdMapper.toPersistence(household);
    await this.householdRepository.save(entity);
  }

  async findByUserId(userId: string): Promise<HouseholdReadModel | null> {
    const member = await this.memberRepository
      .createQueryBuilder('member')
      .where('member.userId = :userId', { userId })
      .leftJoinAndSelect('member.household', 'household')
      .getOneOrFail();

    return member.household;
  }

  async findById(householdId: string): Promise<Household> {
    if (!householdId) {
      throw new Error('Household ID is required');
    }
    const entity = await this.householdRepository.findOne({ where: { id: householdId } });
    if (!entity) {
      throw new Error('Household not found');
    }
    return HouseholdMapper.toDomain(entity);
  }

}
