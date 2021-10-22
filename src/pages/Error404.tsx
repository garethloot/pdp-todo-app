import { useHistory } from "react-router";
import {
  Grid,
  Container,
  Paper,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useAppContext } from "../components/AppContextProvider";
import NavigationBar from "../components/NavigationBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundImage: `url("/img/login.jpg")`,
    backgroundSize: "cover",
  },
  paper: {
    padding: "20px",
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const Page: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      alignItems="center"
    >
      <Container maxWidth="sm">
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h3" className={classes.title}>
            Oops! 404
          </Typography>
          <Typography variant="subtitle1">
            This page does not exist or you do not have access.
          </Typography>
          <Box className={classes.buttons}>
            <Button
              onClick={() => history.push("/")}
              type="button"
              variant="contained"
              color="primary"
            >
              Go to my tasks
            </Button>
          </Box>
        </Paper>
      </Container>
    </Grid>
  );
};

const Error404: React.FC = () => {
  const appContext = useAppContext();

  return (
    <>
      {appContext.isAuthenticated && <NavigationBar />}
      <Page />
    </>
  );
};

export default Error404;
