import { Module } from '@nestjs/common';
import { OrmHouseholdUnitOfWork } from './providers/orm.household.unit-of-work';
import { HouseholdMember } from './entities/household-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Household } from './entities/household.entity';
import { HouseholdUnitOfWork } from '@family-planning/application';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Household,
      HouseholdMember
    ])
  ],
  providers: [
    { provide: HouseholdUnitOfWork, useClass: OrmHouseholdUnitOfWork }
  ],
  exports: [HouseholdUnitOfWork]
})
export class TypeOrmHouseholdsPersistenceModule {}
