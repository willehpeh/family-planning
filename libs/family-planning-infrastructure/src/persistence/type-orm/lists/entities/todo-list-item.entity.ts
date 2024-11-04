import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class TodoListItem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => TodoList, (list) => list.items)
  list: TodoList;
}
