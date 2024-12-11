import { Injectable } from '@angular/core';
import { todolist } from '../../models/todolist.model';

@Injectable({
  providedIn: 'root',
})
export class TodolistsService {
  todolists: todolist[] = [];
  numberTodolists: number = 0;
  constructor() {
    this.load();
  }
  private load() {
    const todolistsData = localStorage.getItem('todolists');
    if (todolistsData) {
      this.todolists = JSON.parse(todolistsData).map(
        (todolistsDataJSON: todolist) =>
          Object.assign(new todolist(), todolistsDataJSON)
      );
      this.numberTodolists = this.todolists.length;
      for (let i = 1; i <= this.todolists.length; i++) {
        this.todolists[i - 1].id = i;
      }
      this.save();
    }
  }
  private save() {
    localStorage.setItem('todolists', JSON.stringify(this.todolists));
  }
  add(todolist: todolist) {
    todolist.id = ++this.numberTodolists;
    this.todolists.push(todolist);
    this.save();
    this.load();
    return this.todolists;
  }
  getTodolists() {
    return this.todolists.map((todo) => todo.copy());
  }
  saveTodolists(todolists: todolist[]) {
    this.todolists = todolists;
    this.save();
  }
  remove(id: number) {
    console.log(id)
    this.todolists = this.todolists.filter((todo) => todo.id !== id);
    this.save();
    this.load();
    return this.todolists;
  }
}
