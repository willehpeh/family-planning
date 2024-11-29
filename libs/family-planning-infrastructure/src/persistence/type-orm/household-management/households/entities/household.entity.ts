import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Household {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('jsonb')
  memberIds: string[];
}
