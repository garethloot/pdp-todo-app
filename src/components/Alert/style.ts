import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
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
