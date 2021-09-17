import PrivateLayout from "../layout/PrivateLayout";

// Components
import TodoList from "./todosPage/TodoList";

const TodosPage: React.FC = () => (
  <PrivateLayout>
    <TodoList title="My Tasks" />
  </PrivateLayout>
);

export default TodosPage;
