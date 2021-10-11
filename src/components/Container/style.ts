import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { ContainerProps } from "./types";

export const useStyles = makeStyles<Theme, ContainerProps>((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "box-sizing": "border-box",
      padding: theme.spacing(2),
      paddingTop: ({ top }) => (top ? "100px" : theme.spacing(1)),
      backgroundColor: ({ color }) => (color ? color : undefined),
    },
  })
);
