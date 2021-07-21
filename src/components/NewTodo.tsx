import { useRef } from "react";

interface NewTodoProps {
  newTodoHandler(todo: string): void;
}

const NewTodo: React.FC<NewTodoProps> = ({ newTodoHandler }) => {
  const todoText = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const text = todoText.current!.value;
    newTodoHandler(text);
  };
  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label>Todo Text</label>
        <input ref={todoText} type="text" id="todo-text"></input>
      </div>
      <button type="submit">ADD TOD O</button>
    </form>
  );
};

export default NewTodo;
