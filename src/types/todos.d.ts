export interface TodoInterface {
  id: number;
  name: string;
  completed: boolean;
}
export interface TodoItemProps {
  todo: TodoInterface;
  onDeleteTodo: Function;
}
export interface TodoInputVars {
  input: any;
}
export interface TodoFilterProps {
  filterHandler: (value: boolean | undefined) => void;
}

export interface TodosProps {
  todos: TodoInterface[];
  onDeleteTodo: Function;
}
export interface NewTodoProps {
  onNewTodo: Function;
}
