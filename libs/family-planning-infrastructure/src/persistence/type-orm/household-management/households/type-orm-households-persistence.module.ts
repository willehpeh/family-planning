import { Module } from '@nestjs/common';
import { OrmHouseholdUnitOfWork } from './providers/orm.household.unit-of-work';
import { OrmHouseholdMemberEntity } from './entities/household-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmHouseholdEntity } from './entities/household.entity';
import { HouseholdUnitOfWork } from '@family-planning/application';
import { HouseholdRepository } from '@family-planning/domain';
import { OrmHouseholdRepository } from './repositories/orm.household.repository';
import { DataSource } from 'typeorm';
import { HouseholdByUserIdView } from './view-entities/household-by-user-id.view-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrmHouseholdEntity,
      OrmHouseholdMemberEntity,
      HouseholdByUserIdView
    ])
  ],
  providers: [
    { provide: HouseholdUnitOfWork, useClass: OrmHouseholdUnitOfWork },
    {
      provide: HouseholdRepository,
      useFactory: (dataSource: DataSource) =>
        new OrmHouseholdRepository(
          dataSource.getRepository(OrmHouseholdEntity)
        ),
      inject: [DataSource]
    },
  ],
  exports: [
    HouseholdUnitOfWork,
    HouseholdRepository
  ]
})
export class TypeOrmHouseholdsPersistenceModule {}
