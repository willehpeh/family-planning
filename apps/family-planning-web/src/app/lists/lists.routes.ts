import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { listsFeature } from './state/lists.reducer';
import { provideEffects } from '@ngrx/effects';
import { ListsEffects } from './state/lists.effects';

export const listRoutes: Routes = [
  { path: 'lists',
    children: [
      { path: 'todo',
        providers: [
          provideState(listsFeature),
          provideEffects(ListsEffects)
        ],
        loadComponent: () => import('./todo-lists-list/todo-lists-list.component').then(m => m.TodoListsListComponent)}
    ]
  },
]
