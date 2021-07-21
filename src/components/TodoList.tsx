import { Todo } from "../types/todos";

interface TodoListProps {
  todos: Todo[];
  todoDeleteHandler(id: string): void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, todoDeleteHandler }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.name}</span>
          <button>DELETE TODO</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
