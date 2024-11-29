import { HouseholdMember, HouseholdMemberRepository } from '@family-planning/domain';
import { HouseholdMember as HouseholdMemberEntity } from '../entities/household-member.entity';
import { Repository } from 'typeorm';
import { HouseholdMemberMapper } from '../mappers/household-member.mapper';

export class OrmHouseholdMemberRepository implements HouseholdMemberRepository {

  constructor(private readonly householdMemberRepository: Repository<HouseholdMemberEntity>) {}

  async save(member: HouseholdMember): Promise<void> {
    const entity = HouseholdMemberMapper.toPersistence(member);
    await this.householdMemberRepository.save(entity);
  }

}
