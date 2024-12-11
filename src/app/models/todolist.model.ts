import { todo } from './todo.model';

export class todolist {
  id: number = 1;
  name: string = '';
  todolist: todo[] = [];
  copy(): todolist {
    return Object.assign(new todolist(), this);
  }
}
