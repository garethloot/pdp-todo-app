import React, { ChangeEvent, useState, useEffect } from "react";

import { TodoInterface } from "../types/todos";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { useQuery, gql } from "@apollo/client";

interface TodoListProps {}

interface TodoProps {
  todo: TodoInterface;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "10px",
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
    marginBottom: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
}));

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const classes = useStyles();
  const [completed, setCompleted] = useState(todo.completed);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };
  return (
    <Paper className={classes.item}>
      <ListItem key={todo.id}>
        <ListItemIcon>
          <Checkbox edge="start" checked={completed} onChange={changeHandler} />
        </ListItemIcon>
        <ListItemText id={todo.id.toString()} primary={todo.name} />
        <ListItemSecondaryAction>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton edge="end">
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
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
  where: any;
}

const Todos: React.FC<TodosProps> = ({ where }) => {
  const classes = useStyles();
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
  const { loading, error, data } = useQuery(TODOS_QUERY, {
    variables: { where: where },
  });

  if (loading) {
    return <></>;
  }
  if (error) {
    return <></>;
  }

  const {
    allTask: { results },
  } = data;
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
  console.log(filter);

  useEffect(() => {}, [filter]);

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Typography variant="h4" component="h4">
          To do's
        </Typography>
        <TodoFilter filterHandler={filterHandler} />
      </div>

      <Todos where={filter} />
    </div>
  );
};

export default TodoList;
