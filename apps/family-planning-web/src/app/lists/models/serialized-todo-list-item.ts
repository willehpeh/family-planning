export type SerializedTodoListItem = {
  id: string;
  name: string;
  status: 'pending' | 'done';
  dateCompleted?: Date;
};
