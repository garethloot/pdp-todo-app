import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { TODOS_QUERY } from "../../queries/todos";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import NewTodo from "./NewTodo";
import TodoFilter from "./TodoFilter";
import Todos from "./Todos";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    boxSizing: "border-box",
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    width: "100%",
  },
}));

const TodoList: React.FC = () => {
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
    <div className={classes.root}>
      <div className={classes.heading}>
        <Typography variant="h4" component="h4">
          To do's
        </Typography>
        <TodoFilter filterHandler={filterHandler} />
      </div>

      <Todos results={results} />
      <NewTodo refetch={refetch} />
    </div>
  );
};

export default TodoList;
