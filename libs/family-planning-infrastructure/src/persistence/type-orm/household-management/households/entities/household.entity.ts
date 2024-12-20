import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OrmHouseholdMemberEntity } from './household-member.entity';

@Entity('household')
export class OrmHouseholdEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('jsonb')
  memberIds: string[];

  @OneToMany(() => OrmHouseholdMemberEntity, member => member.household, { cascade: true, eager: true })
  members: OrmHouseholdMemberEntity[];

  @Column('jsonb', { default: [] })
  pendingMembers: {
    email: string,
    firstName: string,
    lastName: string,
    householdId: string,
    id: string,
  }[]
}
