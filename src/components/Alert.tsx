import React, { useState } from "react";

import { Alert as MuiAlert } from "@material-ui/lab";
import { Fade } from "@material-ui/core";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: "0px",
      paddingRight: "24px",
      paddingLeft: "14px",
    },
    message: {
      paddingLeft: "25px",
    },
  })
);

interface AlertProps {
  text: string;
  severity: "error" | "info" | "success" | "warning";
}

const Alert: React.FC<AlertProps> = ({ text, severity }) => {
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
