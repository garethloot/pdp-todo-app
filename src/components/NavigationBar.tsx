import { useAppContext } from "./AppContextProvider";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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
  const appContext = useAppContext();

  const logoutHandler = () => {
    appContext.logoutUser();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Todo Application
        </Typography>
        <LinkButton text="My Tasks" to="/mytasks" />
        {!appContext.isAuthenticated && <LinkButton text="Login" to="/login" />}
        {appContext.isAuthenticated && (
          <Button onClick={logoutHandler} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
