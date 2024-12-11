import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { todo } from '../../models/todo.model';
import { TodolistService } from '../../services/todolist/todolist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TodolistsService } from '../../services/todolists/todolists.service';
@Component({
  selector: 'app-todolist',
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private todolistService = inject(TodolistService);
  private todolistsService = inject(TodolistsService);
  todo = signal<string>('');
  todos: todo[] = [];
  todolistName: string | null = null;
  constructor() {
    const paramsId: number = this.route.snapshot.params['id'];
    const todolists = this.todolistService.getTodolist(paramsId);
    if (todolists) {
      this.todos = todolists.todolist;
      this.todolistName = todolists.todolistName;
    }
  }
  addTodo() {
    if (this.todo()) {
      const newTodo = new todo();
      newTodo.todo = this.todo();
      this.todos = this.todolistService.add(newTodo);
    }
  }
  save() {
    this.todolistService.saveTodolist(this.todos, this.todolistName as string);
  }
  delete(id: number) {
    this.todos = this.todolistService.remove(id);
  }
  backHome() {
    this.router.navigate(['home']);
  }
}
