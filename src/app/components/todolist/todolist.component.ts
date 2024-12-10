import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { todolist } from '../../models/todolist.model';
import { TodolistService } from '../../services/todolist/todolist.service';
@Component({
  selector: 'app-todolist',
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent {
  private todolistService = inject(TodolistService);
  todo = signal<string>('');
  todos: todolist[] = [];
  constructor() {
    this.todos = this.todolistService.getTodolist();
  }
  addTodo() {
    if (this.todo()) {
      const newTodo = new todolist();
      newTodo.todo = this.todo();
      this.todos = this.todolistService.add(newTodo);
    }
  }
  save() {
    this.todolistService.saveTodolist(this.todos);
  }
  delete(id: number) {
    this.todos = this.todolistService.remove(id);
  }
}
