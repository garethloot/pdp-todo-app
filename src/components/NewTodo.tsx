import { useRef } from "react";

interface NewTodoProps {}

const NewTodo: React.FC<NewTodoProps> = () => {
  const todoText = useRef<HTMLInputElement>(null);
  return (
    <form>
      <div>
        <label>Todo Text</label>
        <input ref={todoText} type="text" id="todo-text"></input>
      </div>
      <button type="submit">ADD TOD O</button>
    </form>
  );
};

export default NewTodo;
