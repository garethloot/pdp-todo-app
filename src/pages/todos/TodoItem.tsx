import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";

import getErrorText from "../../helpers/getErrorText";

import {
  TODO_DELETE_MUTATION,
  TODO_UPDATE_MUTATION,
} from "../../queries/todos";
import { TodoInterface, TodoItemProps, TodoInputVars } from "../../types/todos";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemIcon,
  Checkbox,
  Divider,
  IconButton,
  CircularProgress,
  Fade,
  InputBase,
} from "@material-ui/core";
import Alert from "../../components/Alert";
import { DeleteOutline, KeyboardReturn } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    flex: 1,
  },
}));

const TodoItem: React.FC<TodoItemProps> = ({ todo: item }) => {
  const classes = useStyles();
  const [value, setValue] = useState<{
    todo: TodoInterface;
    prev: TodoInterface;
    hasChange: boolean;
  }>({ todo: item, prev: item, hasChange: false });
  const [visible, setVisible] = useState(true);

  const [deleteMutation, { error: deleteError }] = useMutation<
    any,
    TodoInputVars
  >(TODO_DELETE_MUTATION, {
    onCompleted: (data) => {},
    onError: (error) => {
      setVisible(true);
    },
  });

  const [updateMutation, { loading, error: updateError }] = useMutation<
    any,
    TodoInputVars
  >(TODO_UPDATE_MUTATION, {
    onCompleted: (data) => {
      setValue((prevValue) => {
        return {
          todo: prevValue.todo,
          prev: prevValue.todo,
          hasChange: false,
        };
      });
    },
    onError: (error) => {
      setValue((prevValue) => {
        return {
          todo: prevValue.prev,
          prev: prevValue.prev,
          hasChange: false,
        };
      });
    },
  });

  const deleteHandler = (event: React.FormEvent) => {
    deleteMutation({
      variables: {
        input: { form_data: value.todo },
      },
    });
    setVisible(false);
  };

  const changeCompletedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue((prevValue) => {
      const newTodo = { ...prevValue.todo, completed: event.target.checked };
      return { todo: newTodo, prev: prevValue.todo, hasChange: true };
    });
  };

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevValue) => {
      const newTodo = { ...prevValue.todo, name: event.target.value };
      return { todo: newTodo, prev: prevValue.prev, hasChange: false };
    });
  };

  const applyChanges = () => {
    if (value.todo.name !== value.prev.name) {
      setValue((prevValue) => {
        return { todo: prevValue.todo, prev: prevValue.prev, hasChange: true };
      });
    }
  };

  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      applyChanges();
    }
  };

  useEffect(() => {
    if (value.hasChange) {
      updateMutation({
        variables: {
          input: { form_data: value.todo },
        },
      });
    }
  }, [value]);

  const { todo } = value;

  let errorText = getErrorText(updateError) || getErrorText(deleteError);

  return visible ? (
    <Fade in>
      <>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              color="primary"
              onChange={changeCompletedHandler}
              disabled={loading}
            />
          </ListItemIcon>
          <InputBase
            className={classes.input}
            value={todo.name}
            onChange={changeNameHandler}
            onBlur={applyChanges}
            disabled={loading}
            required
            onKeyPress={onKeyPress}
          />
          <ListItemSecondaryAction>
            {loading && (
              <IconButton onClick={applyChanges}>
                <CircularProgress size={24} />
              </IconButton>
            )}
            {value.todo.name !== value.prev.name && (
              <IconButton>
                <KeyboardReturn />
              </IconButton>
            )}
            <IconButton edge="end" onClick={deleteHandler} disabled={loading}>
              <DeleteOutline />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {errorText && <Alert severity="error" text={errorText} />}
        <Divider />
      </>
    </Fade>
  ) : (
    <></>
  );
};

export default TodoItem;
