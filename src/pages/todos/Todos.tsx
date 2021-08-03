import React from "react";

import { TodoInterface, TodosProps } from "../../types/todos";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { List } from "@material-ui/core";

import TodoItem from "./TodoItem";

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: "100%",
  },
}));

const Todos: React.FC<TodosProps> = ({ results }) => {
  const classes = useStyles();
  return (
    <List dense className={classes.list}>
      {results.map((todo: TodoInterface) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </List>
  );
};

export default Todos;
