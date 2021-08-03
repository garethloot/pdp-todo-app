export interface TodoInterface {
  id: number;
  name: string;
  completed: boolean;
}
export interface TodoItemProps {
  todo: TodoInterface;
}
export interface TodoInputVars {
  input: any;
}
export interface TodoFilterProps {
  filterHandler: (value: boolean | undefined) => void;
}

export interface TodosProps {
  results: any;
}
export interface NewTodoProps {
  refetch: Function;
}
