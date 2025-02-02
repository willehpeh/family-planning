import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class TodoListItem {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => TodoList)
  @JoinColumn({ name: 'listId' })
  listId: string;

  @Column()
  householdId: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'done';

  @Column({ type: 'timestamp', nullable: true })
  dateCompleted: string | null;
}
