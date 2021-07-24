import React, { useState } from "react";

import { TodoInterface } from "../types/todos";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Checkbox,
  Paper,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { useQuery, gql } from "@apollo/client";

interface TodoListProps {}

interface TodoProps {
  todo: TodoInterface;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    width: "100%",
  },
  item: {
    marginBottom: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
}));

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const classes = useStyles();
  const [completed, setCompleted] = useState(todo.completed);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };
  return (
    <Paper className={classes.item}>
      <ListItem key={todo.id}>
        <ListItemIcon>
          <Checkbox edge="start" checked={completed} onChange={changeHandler} />
        </ListItemIcon>
        <ListItemText id={todo.id.toString()} primary={todo.name} />
        <ListItemSecondaryAction>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton edge="end">
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
};

const TodoList: React.FC<TodoListProps> = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState({
    hideCompleted: false,
    hideNotCompleted: false,
  });

  const changeCompletedHandler = () => {};
  const changeNotCompletedHandler = () => {};
  const TODOS_QUERY = gql`
    query ($where: TaskFilterInput!) {
      allTask(where: $where) {
        results {
          id
          name
          completed
        }
        totalCount
      }
    }
  `;
  const { loading, error, data } = useQuery(TODOS_QUERY);

  if (loading) {
    return <></>;
  }
  if (error) {
    return <></>;
  }

  const {
    allTask: { results },
  } = data;

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Typography variant="h4" component="h4">
          Todos
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={<Switch onChange={changeCompletedHandler} />}
            label="Hide completed"
          />
          <FormControlLabel
            control={<Switch onChange={changeNotCompletedHandler} />}
            label="Hide not completed"
          />
        </FormGroup>
      </div>

      <List dense className={classes.list}>
        {results.map((todo: TodoInterface) => {
          return <TodoItem todo={todo} />;
        })}
      </List>
    </div>
  );
};

export default TodoList;
