import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class TodoListItem {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => TodoList, (list) => list.items, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  list: TodoList;

  @Column()
  householdId: string;

  @Column()
  status: 'pending' | 'done';

  @Column({ nullable: true })
  dateCompleted: Date;
}
