import React, { ChangeEvent } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";

import { InputBase } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  inputBase: {
    marginLeft: theme.spacing(4),
    flex: 1,
  },
  input: {},
}));

interface SearchProps {
  searchHandler: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchHandler }) => {
  const classes = useStyles();
  let timer: ReturnType<typeof setTimeout>;
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      searchHandler(event.target.value);
    }, 500);
  };

  return (
    <div className={classes.root}>
      <SearchIcon />
      <InputBase
        className={classes.inputBase}
        classes={{
          input: classes.input,
        }}
        onChange={changeHandler}
        placeholder="Search tasks"
        inputProps={{ "aria-label": "Search tasks" }}
      />
    </div>
  );
};

export default Search;
