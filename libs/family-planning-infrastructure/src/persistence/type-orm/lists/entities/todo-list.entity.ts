import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TodoListItem } from './todo-list-item.entity';

@Entity()
export class TodoList {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => TodoListItem, (item) => item.list, { cascade: true, eager: true })
  items: TodoListItem[];
}
