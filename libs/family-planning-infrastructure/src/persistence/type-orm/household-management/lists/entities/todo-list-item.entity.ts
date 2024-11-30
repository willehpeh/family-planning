import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class TodoListItem {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => TodoList, (list) => list.items)
  list: TodoList;

  @Column()
  householdId: string;
}
