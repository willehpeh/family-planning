import { HouseholdRepositoryProvider, HouseholdUnitOfWork } from '@family-planning/application';
import { DataSource } from 'typeorm';
import { OrmHouseholdRepository } from '../repositories/orm.household.repository';
import { Household as HouseholdEntity } from '../entities/household.entity';
import { HouseholdMember as HouseholdMemberEntity } from '../entities/household-member.entity';
import { OrmHouseholdMemberRepository } from '../repositories/orm.household-member.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmHouseholdUnitOfWork implements HouseholdUnitOfWork {
  constructor(private readonly dataSource: DataSource) {}

  transaction<T>(operation: (repositories: HouseholdRepositoryProvider) => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const householdMemberReposotiry = new OrmHouseholdMemberRepository(
        transactionalEntityManager.getRepository(HouseholdMemberEntity)
      );
      const householdRepository = new OrmHouseholdRepository(
        transactionalEntityManager.getRepository(HouseholdEntity),
        householdMemberReposotiry
      );
      const repositories: HouseholdRepositoryProvider = {
        householdRepository: () => householdRepository,
        householdMemberRepository: () => householdMemberReposotiry
      };
      return operation(repositories);
    });
  }


}
