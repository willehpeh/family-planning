import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoList } from './models/todo-list';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  constructor(private http: HttpClient) {}

  loadAllLists() {
    return this.http.get<TodoList[]>('api/lists/todo');
  }
}
