import React, { ChangeEvent, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import {
  TODO_DELETE_MUTATION,
  TODO_UPDATE_MUTATION,
  TODOS_QUERY,
} from "../../queries";

import { TodoInterface } from "../../types/todos";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Checkbox,
  Paper,
  IconButton,
  FormControlLabel,
  FormControl,
  Typography,
  Radio,
  RadioGroup,
  CircularProgress,
  Fade,
  InputBase,
} from "@material-ui/core";
import { Delete, KeyboardReturn, VideoLabelRounded } from "@material-ui/icons";

import { useQuery } from "@apollo/client";

import NewTodo from "./NewTodo";
import { valueFromAST } from "graphql";

interface TodoListProps {}

interface TodoProps {
  todo: TodoInterface;
}

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
  input: {
    flex: 1,
  },
  item: {
    marginBottom: theme.spacing(2),
    paddingTop: "2px",
    paddingBottom: "2px",
  },
}));

interface InputVars {
  input: any;
}

const TodoItem: React.FC<TodoProps> = ({ todo: item }) => {
  const classes = useStyles();
  const [value, setValue] = useState<{
    todo: TodoInterface;
    prev: TodoInterface;
    hasChange: boolean;
  }>({ todo: item, prev: item, hasChange: false });
  const [visible, setVisible] = useState(true);

  const [deleteMutation, { loading: deleteLoading }] = useMutation<
    any,
    InputVars
  >(TODO_DELETE_MUTATION, {
    onCompleted: (data) => {},
    onError: (error) => {
      setVisible(true);
    },
  });

  const [updateMutation, { loading }] = useMutation<any, InputVars>(
    TODO_UPDATE_MUTATION,
    {
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
    }
  );

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
        return { todo: prevValue.todo, prev: prevValue.todo, hasChange: true };
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

  return visible ? (
    <Fade in>
      <Paper className={classes.item}>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
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
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    </Fade>
  ) : (
    <></>
  );
};

interface TodoFilterProps {
  filterHandler: (value: boolean | undefined) => void;
}

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

interface TodosProps {
  results: any;
}

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

const TodoList: React.FC<TodoListProps> = () => {
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

  const { loading, error, data, refetch } = useQuery(TODOS_QUERY, {
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
