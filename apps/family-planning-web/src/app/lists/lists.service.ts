import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SerializedTodoList } from './models/serialized-todo-list';
import { Observable } from 'rxjs';
import { CreateTodoListDto, ItemDetails } from '@family-planning/application';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  constructor(private http: HttpClient) {}

  loadAllLists(): Observable<SerializedTodoList[]> {
    return this.http.get<SerializedTodoList[]>('api/lists/todo');
  }

  createList(createListDto: CreateTodoListDto): Observable<void> {
    return this.http.post<void>('api/lists/todo', createListDto);
  }

  addItemToList(listId: string, itemDetails: ItemDetails): Observable<void> {
    return this.http.post<void>(`api/lists/todo/${listId}/add-item`, itemDetails);
  }

  markItemAsDone(listId: string, itemId: string): Observable<void> {
    return this.http.post<void>(`api/lists/todo/${listId}/mark-item-as-done`, { itemId });
  }
}
