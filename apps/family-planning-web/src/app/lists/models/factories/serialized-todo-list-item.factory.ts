import { ItemDetails } from '@family-planning/application';
import { SerializedTodoListItem } from '../serialized-todo-list-item';

export class SerializedTodoListItemFactory {
  static temporaryItem(itemDetails: ItemDetails): SerializedTodoListItem {
    return {
      id: Date.now().toString(),
      name: itemDetails.name,
      status: 'pending',
    };
  }
}
