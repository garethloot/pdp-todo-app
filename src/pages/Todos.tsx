import { useQuery, gql } from "@apollo/client";

// Components
import TodoList from "../components/TodoList";
import NewTodo from "../components/NewTodo";

const TodosPage: React.FC = () => {
  const TODOS_QUERY = gql`
    query {
      allTask {
        results {
          id
          name
        }
        totalCount
      }
    }
  `;
  const { loading, error, data } = useQuery(TODOS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const todoAddHandler = (text: string) => {};

  const todoDeleteHandler = (todoId: string) => {};

  const {
    allTask: { results },
  } = data;

  return (
    <div className="App">
      <NewTodo newTodoHandler={todoAddHandler} />
      <TodoList todos={results} todoDeleteHandler={todoDeleteHandler} />
    </div>
  );
};

export default TodosPage;
