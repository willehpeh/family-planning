import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrmHouseholdEntity } from './household.entity';

@Entity('household_member')
export class OrmHouseholdMemberEntity {
  @PrimaryColumn()
  id: string;

  @Index({ unique: true })
  @Column()
  userId: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  householdId: string;

  @ManyToOne(() => OrmHouseholdEntity, household => household.members, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  household: OrmHouseholdEntity;
}
