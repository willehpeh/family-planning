import { Routes } from '@angular/router';

export const listRoutes: Routes = [
  {
    path: 'todo',
    loadComponent: () => import('./components/todo-lists-list/todo-lists-list.component').then(m => m.TodoListsListComponent)
  },
  {
    path: 'todo/new',
    loadComponent: () => import('./components/todo-lists-list/create-list-form/create-list-form.component').then(m => m.CreateListFormComponent)
  },
  {
    path: 'todo/:id',
    loadComponent: () => import('./components/todo-list-detail/todo-list-detail.component').then(m => m.TodoListDetailComponent)
  },
];
