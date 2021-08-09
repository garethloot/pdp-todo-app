import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { TODOS_QUERY } from "../../queries/todos";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Paper, Divider } from "@material-ui/core";

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
}));

interface TodoListProps {
  title: string;
}

const TodoList: React.FC<TodoListProps> = ({ title }) => {
  const classes = useStyles();
  const [filter, setFilter] = useState<any>({});

  const filterHandler = (value: boolean | undefined) => {
    console.log(value);
    let where = undefined;
    if (value !== undefined) {
      where = { _and: [{ completed: { eq: value } }] };
    }
    setFilter(where);
  };

  const { data, refetch } = useQuery(TODOS_QUERY, {
    fetchPolicy: "network-only",
    variables: { where: filter },
  });

  let results = [];
  if (data) {
    results = data.allTask.results;
  }

  return (
    <Paper className={classes.root} elevation={2}>
      <div className={classes.heading}>
        <Typography variant="h4" component="h4">
          {title}
        </Typography>
        <TodoFilter filterHandler={filterHandler} />
      </div>
      <Divider />
      <Todos results={results} />
      <NewTodo refetch={refetch} />
    </Paper>
  );
};

export default TodoList;
