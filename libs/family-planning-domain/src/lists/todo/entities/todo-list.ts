export class TodoList {
  constructor(private readonly _name: string) {
  }

  name(): string {
    return this._name;
  }
}
