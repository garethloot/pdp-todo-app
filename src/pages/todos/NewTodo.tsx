import React, { useState, useRef } from "react";
import { useMutation } from "@apollo/client";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Paper,
  InputBase,
  Checkbox,
  IconButton,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardReturn } from "@material-ui/icons";

import { TodoInputVars, NewTodoProps } from "../../types/todos";
import { TODO_CREATE_MUTATION } from "../../queries/todos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%",
      boxSizing: "border-box",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    checkbox: {
      marginRight: theme.spacing(2),
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

const NewTodo: React.FC<NewTodoProps> = ({ refetch }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState<{
    name: string;
    completed: boolean;
  }>({ name: "", completed: false });
  const inputRef = useRef<HTMLInputElement>(null);

  const [loginMutation, { loading }] = useMutation<any, TodoInputVars>(
    TODO_CREATE_MUTATION,
    {
      onCompleted: (data) => {
        setFormData({
          name: "",
          completed: false,
        });
        inputRef.current?.focus();
        refetch();
      },
      onError: (error) => {},
    }
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation({
      variables: {
        input: { form_data: formData },
      },
    });
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={submitHandler}>
      <Checkbox
        className={classes.checkbox}
        checked={formData.completed}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFormData((prevState) => {
            return { ...prevState, completed: event.target.checked };
          })
        }
        disabled={loading}
      />
      <InputBase
        autoFocus
        inputRef={inputRef}
        className={classes.input}
        placeholder="Add new todo"
        value={formData.name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setFormData((prevState) => {
            return { ...prevState, name: event.target.value };
          })
        }
        disabled={loading}
        required
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : <KeyboardReturn />}
      </IconButton>
    </Paper>
  );
};

export default NewTodo;
