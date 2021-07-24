import { Typography } from "@material-ui/core";

// Components
import TodoList from "../components/TodoList";
import NewTodo from "../components/NewTodo";

const TodosPage: React.FC = () => {
  return (
    <div>
      <Typography variant="h1" component="h2">
        Todos overview
      </Typography>
      <TodoList />
    </div>
  );
};

export default TodosPage;
