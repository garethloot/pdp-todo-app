import React, { ChangeEvent } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TodoFilterObject } from "../../types/todos";

import Search from "./Search";

import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import { TodoFilterProps } from "../../types/todos";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  filter: {
    width: "400px",
    display: "flex",
    alignItems: "flex-end",
  },
}));

const TodoFilter: React.FC<TodoFilterProps> = ({ filterHandler }) => {
  const classes = useStyles();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let value: boolean | undefined = undefined;
    if (event.target.value === "completed") value = true;
    if (event.target.value === "todo") value = false;
    filterHandler((prev: TodoFilterObject) => {
      return { ...prev, completed: value };
    });
  };

  const searchHandler = (value: string) => {
    filterHandler((prev: TodoFilterObject) => {
      return { ...prev, name: value };
    });
  };

  return (
    <div className={classes.root}>
      <Search searchHandler={searchHandler} />
      <FormControl component="fieldset" className={classes.filter}>
        <RadioGroup row name="filter" defaultValue="all">
          <FormControlLabel
            control={<Radio onChange={changeHandler} />}
            label="All"
            value="all"
          />
          <FormControlLabel
            control={<Radio onChange={changeHandler} />}
            label="Completed"
            value="completed"
          />
          <FormControlLabel
            control={<Radio onChange={changeHandler} />}
            label="Todo"
            value="todo"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default TodoFilter;
