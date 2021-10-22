import React, { useState } from "react";

import { Alert as MuiAlert } from "@material-ui/lab";
import { Fade } from "@material-ui/core";

import { AlertProps } from "./types";
import { useStyles } from "./style";

const Alert: React.FC<AlertProps> = ({ text, severity }: AlertProps) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(true);
  return visible ? (
    <Fade in>
      <MuiAlert
        classes={{ root: classes.root, message: classes.message }}
        onClose={() => setVisible(false)}
        severity={severity}
      >
        {text}
      </MuiAlert>
    </Fade>
  ) : (
    <></>
  );
};

export default Alert;
