export class todo {
  id: number = 1;
  isChecked: boolean = false;
  todo: string = '';
  copy(): todo {
    return Object.assign(new todo(), this);
  }
}
