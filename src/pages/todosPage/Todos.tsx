import React from "react";

import { TodoInterface, TodosProps } from "../../types/todos";

import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";

import TodoItem from "./TodoItem";

const useStyles = makeStyles(() => ({
  list: {
    width: "100%",
  },
}));

const Todos: React.FC<TodosProps> = ({ todos, onDeleteTodo }: TodosProps) => {
  const classes = useStyles();
  return (
    <List dense disablePadding className={classes.list}>
      {todos.map((todo: TodoInterface) => {
        return (
          <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
        );
      })}
    </List>
  );
};

export default Todos;
