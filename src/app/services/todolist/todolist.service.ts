import { Injectable } from '@angular/core';
import { todolist } from '../../models/todolist.model';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  todolist: todolist[] = [];
  numberTodos: number = 0;
  constructor() {
    this.load();
  }
  private load() {
    const todolistData = localStorage.getItem('todolist');
    if (todolistData) {
      this.todolist = JSON.parse(todolistData).map(
        (todolistDataJSON: todolist) =>
          Object.assign(new todolist(), todolistDataJSON)
      );
      this.numberTodos = this.todolist.length;
      for (let i = 1; i <= this.todolist.length; i++) {
        this.todolist[i - 1].id = i;
      }
    }
  }
  private save() {
    localStorage.setItem('todolist', JSON.stringify(this.todolist));
  }
  add(todo: todolist) {
    todo.id = ++this.numberTodos;
    this.todolist.push(todo);
    return this.todolist;
  }
  getTodolist() {
    return this.todolist.map((todo) => todo.copy());
  }
  saveTodolist(todos: todolist[]) {
    this.todolist = todos;
    this.save();
  }
  remove(id: number) {
    this.todolist = this.todolist.filter((todo) => todo.id !== id);
    return this.todolist;
  }
}
