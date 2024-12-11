import { Routes } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TodolistsComponent } from './components/todolists/todolists.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: TodolistsComponent },
  {
    path: 'todolist/:id',
    component: TodolistComponent,
  },
  //   { path: '**',  },
];
