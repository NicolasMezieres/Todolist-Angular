import { CommonModule } from '@angular/common';
import { Component, computed, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { todolist } from '../../models/todolist.model';
import { TodolistsService } from '../../services/todolists/todolists.service';

@Component({
  selector: 'app-todolists',
  imports: [FormsModule, MatIcon],
  templateUrl: './todolists.component.html',
  styleUrl: './todolists.component.css',
})
export class TodolistsComponent {
  private router = inject(Router);
  private todolistsService = inject(TodolistsService);
  todolist = signal<string>('');
  todolists = signal<todolist[]>([]);
  search = model<string>('');
  constructor() {
    this.todolists.set(this.todolistsService.getTodolists());
  }
  filterTodolist = computed(() => {
    return this.todolists().filter((todolist) =>
      todolist.name.includes(this.search())
    );
  });
  addTodolist() {
    if (this.todolist()) {
      const newTodolist = new todolist();
      newTodolist.name = this.todolist();
      this.todolists.set(this.todolistsService.add(newTodolist));
    }
  }
  navigate(id: number) {
    console.log(id);
    this.router.navigate([`todolist/${id}`]);
  }
  delete(id: number) {
    this.todolists.set(this.todolistsService.remove(id));
  }
}
