import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { listsFeature } from './state/lists.reducer';
import { provideEffects } from '@ngrx/effects';
import { ListsEffects } from './state/lists.effects';

export const listRoutes: Routes = [
  {
    path: 'lists',
    providers: [
      provideState(listsFeature),
      provideEffects(ListsEffects)
    ],
    children: [
      {
        path: 'todo',
        loadComponent: () => import('./todo-lists-list/todo-lists-list.component').then(m => m.TodoListsListComponent)
      },
      {
        path: 'todo/new',
        loadComponent: () => import('./todo-lists-list/create-list-form/create-list-form.component').then(m => m.CreateListFormComponent)
      },
      {
        path: 'todo/:id',
        loadComponent: () => import('./todo-list-detail/todo-list-detail.component').then(m => m.TodoListDetailComponent)
      },
    ]
  },
];
