import { Module } from '@nestjs/common';
import { OrmHouseholdMemberEntity } from './entities/household-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmHouseholdEntity } from './entities/household.entity';
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
    {
      provide: HouseholdRepository,
      useFactory: (dataSource: DataSource) =>
        new OrmHouseholdRepository(
          dataSource.getRepository(OrmHouseholdEntity),
          dataSource.getRepository(OrmHouseholdMemberEntity)
        ),
      inject: [DataSource]
    },
  ],
  exports: [
    HouseholdRepository
  ]
})
export class TypeOrmHouseholdsPersistenceModule {}
