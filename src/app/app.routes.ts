import { Routes } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    // path: 'todolist',
    path: 'home',
    children: [
      { path: '', component: TodolistComponent },
      {
        path: ':id',
        component: TodolistComponent,
      },
    ],
  },
];
