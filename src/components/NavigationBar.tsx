import { useHistory } from "react-router-dom";
import { useAppContext } from "./AppContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface LinkButtonProps {
  text: string;
  to: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ text, to }) => {
  const history = useHistory();
  const loginClickHandler = () => {
    history.push(to);
  };
  return (
    <Button color="inherit" onClick={loginClickHandler}>
      {text}
    </Button>
  );
};

const NavigationBar: React.FC = () => {
  const classes = useStyles();
  const appContext = useAppContext();

  const logoutHandler = () => {
    appContext.logoutUser();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
          <LinkButton text="Todos" to="/todos" />
          {!appContext.isAuthenticated && (
            <LinkButton text="Login" to="/login" />
          )}
          {appContext.isAuthenticated && (
            <Button onClick={logoutHandler} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
