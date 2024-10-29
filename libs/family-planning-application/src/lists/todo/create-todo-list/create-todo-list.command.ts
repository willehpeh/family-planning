export class CreateTodoListCommand {
  public readonly name: string;
  constructor({ name }: { name: string }) {
    this.name = name;
  }
}
