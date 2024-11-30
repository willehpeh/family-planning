import { CreateTodoListDto } from './create-todo-list.dto';

export class CreateTodoListCommand {
  public readonly name: string;
  constructor({ name }: CreateTodoListDto, public readonly householdId: string) {
    this.name = name;
  }
}
