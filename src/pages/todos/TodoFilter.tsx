import React, { ChangeEvent } from "react";

import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import { TodoFilterProps } from "../../types/todos";

const TodoFilter: React.FC<TodoFilterProps> = ({ filterHandler }) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let value = undefined;
    if (event.target.value === "completed") value = true;
    if (event.target.value === "todo") value = false;
    filterHandler(value);
  };

  return (
    <FormControl component="fieldset">
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
  );
};

export default TodoFilter;
