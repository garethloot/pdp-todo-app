import { useAppContext } from "./AppContextProvider";
import { useHistory } from "react-router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import CloudDone from "@material-ui/icons/CloudDone";

import LinkButton from "./LinkButton";

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavigationBar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const appContext = useAppContext();

  const logoutHandler = () => {
    appContext.logoutUser();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          href={"/"}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <CloudDone />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Task manager
        </Typography>
        <LinkButton text="My Tasks" to="/" />
        <LinkButton text="404" to="/some-unknown-url" />
        {!appContext.isAuthenticated && <LinkButton text="Login" to="/login" />}
        {appContext.isAuthenticated && (
          <Button
            onClick={() => {
              history.push("/login");
              logoutHandler();
            }}
            color="inherit"
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
