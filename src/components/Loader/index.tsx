import React from "react";

import { Backdrop, CircularProgress } from "@material-ui/core";
import { useStyles } from "./style";
import { LoaderProps } from "./types";

const Loader: React.FC<LoaderProps> = ({ open }: LoaderProps) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
