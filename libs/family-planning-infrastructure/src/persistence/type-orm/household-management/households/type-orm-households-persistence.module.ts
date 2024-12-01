import { Module } from '@nestjs/common';
import { OrmHouseholdUnitOfWork } from './providers/orm.household.unit-of-work';
import { HouseholdMember } from './entities/household-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Household } from './entities/household.entity';
import { HouseholdUnitOfWork } from '@family-planning/application';
import { HouseholdMemberRepository, HouseholdRepository } from '@family-planning/domain';
import { OrmHouseholdRepository } from './repositories/orm.household.repository';
import { OrmHouseholdMemberRepository } from './repositories/orm.household-member.repository';
import { DataSource } from 'typeorm';
import { HouseholdByUserIdView } from './view-entities/household-by-user-id.view-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Household,
      HouseholdMember,
      HouseholdByUserIdView
    ])
  ],
  providers: [
    { provide: HouseholdUnitOfWork, useClass: OrmHouseholdUnitOfWork },
    {
      provide: HouseholdMemberRepository,
      useFactory: (dataSource: DataSource) => new OrmHouseholdMemberRepository(dataSource.getRepository(HouseholdMember)),
      inject: [DataSource]
    },
    {
      provide: HouseholdRepository,
      useFactory: (dataSource: DataSource) =>
        new OrmHouseholdRepository(
          dataSource.getRepository(Household),
          dataSource.getRepository(HouseholdByUserIdView)
        ),
      inject: [DataSource]
    },
  ],
  exports: [
    HouseholdUnitOfWork,
    HouseholdRepository,
    HouseholdMemberRepository
  ]
})
export class TypeOrmHouseholdsPersistenceModule {}
