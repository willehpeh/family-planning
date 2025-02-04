import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTodoListDto, ItemDetails } from '@family-planning/application';
import { TodoListReadModel } from '@family-planning/domain';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  constructor(private http: HttpClient) {}

  loadAllLists(): Observable<TodoListReadModel[]> {
    return this.http.get<TodoListReadModel[]>('api/lists/todo');
  }

  createList(createListDto: CreateTodoListDto): Observable<{ id: string }> {
    return this.http.post<{ id: string }>('api/lists/todo', createListDto);
  }

  createListItem(listId: string, itemDetails: ItemDetails): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`api/lists/todo/${listId}/add-item`, itemDetails);
  }

  markItemAsDone(listId: string, itemId: string): Observable<void> {
    return this.http.post<void>(`api/lists/todo/${listId}/mark-item-as-done`, { itemId });
  }

  markDoneItemAsPending(listId: string, itemId: string): Observable<void> {
    return this.http.post<void>(`api/lists/todo/${listId}/mark-done-item-as-pending`, { itemId });
  }
}
