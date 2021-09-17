import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import NavigationBar from "../components/NavigationBar";

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "box-sizing": "border-box",
      padding: theme.spacing(2),
      paddingTop: "100px",
    },
  })
);

const PrivateLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <NavigationBar />
      <div className={classes.root}>{children}</div>
    </>
  );
};

export default PrivateLayout;
