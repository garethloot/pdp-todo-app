import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";

import { TODOS_QUERY } from "../../queries/todos";
import { TodoInterface } from "../../types/todos";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Paper, Divider } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";

import NewTodo from "./NewTodo";
import TodoFilter from "./TodoFilter";
import Todos from "./Todos";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    display: "flex",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    justifyContent: "space-between",
  },
  list: {
    width: "100%",
  },
  space: {
    height: "4px",
  },
}));

interface TodoListProps {
  title: string;
}

// Get data on first mount
// Get data on demand when needed
// Get more data

const TodoList: React.FC<TodoListProps> = ({ title }) => {
  const classes = useStyles();
  const [filter, setFilter] = useState<any>({});
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  const filterHandler = (value: boolean | undefined): void => {
    let where = undefined;
    if (value !== undefined) {
      where = { _and: [{ completed: { eq: value } }] };
    }
    setFilter(where);
  };

  const [getTodos, { loading }] = useLazyQuery(TODOS_QUERY, {
    fetchPolicy: "network-only",
    variables: { where: filter, take: 5 },
    onCompleted: (response) => {
      setTodos(response.allTask.results);
    },
  });

  const addTodo = (todo: TodoInterface) => {
    setTodos((prev) => {
      return [...prev, todo];
    });
  };

  const deleteTodo = (deleteTodo: TodoInterface) => {
    setTodos((prev: TodoInterface[]) => {
      return prev.filter((todo) => todo.id !== deleteTodo.id);
    });
  };

  useEffect(() => getTodos(), [getTodos]);

  return (
    <Paper className={classes.root} elevation={2}>
      <div className={classes.heading}>
        <Typography variant="h4" component="h4">
          {title}
        </Typography>
        <TodoFilter filterHandler={filterHandler} />
      </div>
      {loading ? <LinearProgress /> : <div className={classes.space}></div>}
      <Divider />
      <Todos todos={todos} onDeleteTodo={deleteTodo} />
      <NewTodo onNewTodo={addTodo} />
    </Paper>
  );
};

export default TodoList;
