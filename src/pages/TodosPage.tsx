import { Typography, Paper } from "@material-ui/core";
import PageContainer from "../components/PageContainer";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// Components
import TodoList from "./todos/TodoList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "grey",
    },
  })
);

const TodosPage: React.FC = () => {
  const classes = useStyles();
  return (
    <PageContainer top>
      <TodoList title="My Tasks" />
    </PageContainer>
  );
};

export default TodosPage;
