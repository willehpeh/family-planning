import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class HouseholdMember {
  @PrimaryColumn()
  id: string;

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
}
