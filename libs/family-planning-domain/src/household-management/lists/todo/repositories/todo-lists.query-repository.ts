type RawTodoList = { id: string, name: string, itemIds: string[] }[];

export abstract class TodoListsQueryRepository {
  abstract findAll(): Promise<RawTodoList>;
}
