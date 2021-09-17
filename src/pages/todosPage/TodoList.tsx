import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { useInView } from "react-intersection-observer";
import { API_TASK_TAKE } from "../../config";

import { TODOS_QUERY } from "../../queries/todos";
import { TodoInterface } from "../../types/todos";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { Sync } from "@material-ui/icons";

import NewTodo from "./NewTodo";
import TodoFilter from "./TodoFilter";
import Todos from "./Todos";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    display: "flex",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    justifyContent: "space-between",
  },
  list: {
    width: "100%",
  },
  space: {
    height: "4px",
  },
  getMore: {
    marginTop: theme.spacing(1),
  },
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface TodoListProps {
  title: string;
}

const TodoList: React.FC<TodoListProps> = ({ title }) => {
  const classes = useStyles();
  const [filter, setFilter] = useState<any>({});
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const filterHandler = (value: boolean | undefined): void => {
    let where = undefined;
    if (value !== undefined) {
      where = { _and: [{ completed: { eq: value } }] };
    }
    setFilter(where);
    setPage(0);
  };

  const { loading, data } = useQuery(TODOS_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      where: filter,
      take: API_TASK_TAKE,
      skip: API_TASK_TAKE * page,
    },
    onCompleted: (response) => {
      if (page === 0) {
        setTodos(response.allTask.results);
      } else {
        setTodos((prev) => [...prev, ...response.allTask.results]);
      }
      setTotalCount((data && data.allTask && data.allTask.totalCount) || 0);
    },
  });

  const addTodo = (todo: TodoInterface) => {
    setTodos((prev) => {
      return [...prev, todo];
    });
  };

  const deleteTodo = (deleteTodo: TodoInterface) => {
    setTodos((prev: TodoInterface[]) => {
      return prev.filter((todo) => todo.id !== deleteTodo.id);
    });
  };

  const count = todos.length;
  const getMore = totalCount > count;

  const getNextPage = useCallback(() => {
    setPage((prev) => (getMore ? prev + 1 : prev));
  }, [setPage, getMore]);

  useEffect(() => {
    if (inView) {
      getNextPage();
    }
  }, [inView, getNextPage]);

  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <div className={classes.heading}>
          <Typography variant="h4" component="h4">
            {title}
          </Typography>

          <TodoFilter filterHandler={filterHandler} />
        </div>
        {loading ? <LinearProgress /> : <div className={classes.space}></div>}
        <Divider />
        <Todos todos={todos} onDeleteTodo={deleteTodo} />
        <NewTodo onNewTodo={addTodo} />
      </Paper>
      {getMore && (
        <div className={classes.alignCenter}>
          <Button
            onClick={getNextPage}
            ref={ref}
            disabled={loading}
            variant="outlined"
            startIcon={<Sync />}
            className={classes.getMore}
          >
            Get more (Showing {count}/{totalCount})
          </Button>
        </div>
      )}
    </>
  );
};

export default TodoList;
