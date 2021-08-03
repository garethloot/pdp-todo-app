import { Typography } from "@material-ui/core";

// Components
import TodoList from "./todos/TodoList";

const TodosPage: React.FC = () => {
  return (
    <div>
      <Typography variant="h1" component="h2">
        Task overview
      </Typography>
      <TodoList />
    </div>
  );
};

export default TodosPage;
