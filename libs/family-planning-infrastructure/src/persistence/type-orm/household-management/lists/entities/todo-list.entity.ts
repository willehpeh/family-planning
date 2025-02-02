import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TodoList {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', array: true, default: () => "'{}'" })
  itemIds: string[];

  @Column()
  householdId: string;
}
