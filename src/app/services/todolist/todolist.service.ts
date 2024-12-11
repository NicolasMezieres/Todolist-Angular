import { inject, Injectable } from '@angular/core';
import { todo } from '../../models/todo.model';
import { todolist } from '../../models/todolist.model';
import { TodolistsService } from '../todolists/todolists.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  todolist: todo[] = [];
  private todolists: todolist[] = [];
  todolistName: string = '';
  private router = inject(Router);
  todolistsService = inject(TodolistsService);
  numberTodos: number = 0;
  todolistId: number | null = null;
  constructor() {
    this.load();
  }
  private load() {
    this.todolists = this.todolistsService.getTodolists();
  }
  private save() {
    localStorage.setItem('todolist', JSON.stringify(this.todolist));
  }
  add(todo: todo) {
    todo.id = ++this.numberTodos;
    this.todolist.push(todo);
    this.todolists[(this.todolistId as number) - 1].todolist = this.todolist;
    return this.todolist;
  }
  getTodolist(id: number): { todolist: todo[]; todolistName: string } | void {
    this.load();
    const todolistData = this.todolists.find((todolist) => todolist.id == id);
    console.log(todolistData);
    if (todolistData !== undefined) {
      this.todolistId = id;
      this.todolist = todolistData.todolist;
      this.todolistName = todolistData.name;
      return { todolist: this.todolist, todolistName: this.todolistName };
    } else {
      this.router.navigate(['home']);
    }
  }

  saveTodolist(todos: todo[], todolistName: string) {
    this.todolist = todos;
    this.todolists[(this.todolistId as number) - 1].todolist = this.todolist;
    this.todolists[(this.todolistId as number) - 1].name = todolistName;
    this.todolistsService.saveTodolists(this.todolists);
    this.save();
  }
  remove(id: number) {
    this.todolist = this.todolist.filter((todo) => todo.id !== id);
    this.todolists[(this.todolistId as number) - 1].todolist = this.todolist;
    return this.todolist;
  }
}
