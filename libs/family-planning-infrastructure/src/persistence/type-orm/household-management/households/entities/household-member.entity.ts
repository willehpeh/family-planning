import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class HouseholdMember {
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
}
