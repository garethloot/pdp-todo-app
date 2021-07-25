import React, { ChangeEvent, useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";

import { TODO_DELETE_MUTATION } from "../../queries";

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
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { useQuery, gql } from "@apollo/client";

import NewTodo from "./NewTodo";

interface TodoListProps {}

interface TodoProps {
  todo: TodoInterface;
  refetch: Function;
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
  item: {
    marginBottom: theme.spacing(2),
    paddingTop: "2px",
    paddingBottom: "2px",
  },
}));

interface InputVars {
  input: any;
  application_identifier: string;
}

const TodoItem: React.FC<TodoProps> = ({ todo, refetch }) => {
  const classes = useStyles();
  const [completed, setCompleted] = useState(todo.completed);
  const [loginMutation, { loading }] = useMutation<any, InputVars>(
    TODO_DELETE_MUTATION,
    {
      onCompleted: (data) => {
        refetch();
      },
      onError: (error) => {},
    }
  );

  const deleteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation({
      variables: {
        application_identifier: "pdp-todo-app-dev",
        input: { form_data: { id: todo.id } },
      },
    });
  };
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };
  return (
    <Fade in>
      <Paper className={classes.item}>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={completed}
              onChange={changeHandler}
              disabled={loading}
            />
          </ListItemIcon>
          <ListItemText id={todo.id.toString()} primary={todo.name} />
          <ListItemSecondaryAction>
            <IconButton disabled={loading}>
              <Edit />
            </IconButton>
            <IconButton edge="end" onClick={deleteHandler} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : <Delete />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    </Fade>
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
  loading: boolean;
  error: ApolloError | undefined;
  results: any;
  refetch: Function;
}

const Todos: React.FC<TodosProps> = ({ loading, error, results, refetch }) => {
  const classes = useStyles();
  return (
    <List dense className={classes.list}>
      {results.map((todo: TodoInterface) => {
        return <TodoItem key={todo.id} todo={todo} refetch={refetch} />;
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

  const TODOS_QUERY = gql`
    query ($where: TaskFilterInput!) {
      allTask(where: $where) {
        results {
          id
          name
          completed
        }
        totalCount
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(TODOS_QUERY, {
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

      <Todos
        loading={loading}
        error={error}
        results={results}
        refetch={refetch}
      />
      <NewTodo refetch={refetch} />
    </div>
  );
};

export default TodoList;
