import { HouseholdMemberReadModel, HouseholdMemberRepository } from '@family-planning/domain';
import { OrmHouseholdMemberEntity as HouseholdMemberEntity } from '../entities/household-member.entity';
import { Repository } from 'typeorm';

export class OrmHouseholdMemberRepository implements HouseholdMemberRepository {

  constructor(private readonly householdMemberRepository: Repository<HouseholdMemberEntity>) {}

  async findByUserId(userId: string): Promise<HouseholdMemberReadModel | null> {
    return this.householdMemberRepository.findOne({ where: { userId } });
  }
}
