export class todolist {
  id: number = 1;
  isChecked: boolean = false;
  todo: string = '';
  copy(): todolist {
    return Object.assign(new todolist(), this);
  }
}
