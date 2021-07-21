import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { useHistory } from "react-router";

import { useAppContext } from "../components/AppContextProvider";

import { LOGIN_MUTATION } from "../queries";

// import { useLocation } from "react-router-dom";

import {
  Grid,
  Container,
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80%",
  },
  paper: {
    padding: "20px",
  },
  buttons: {
    marginTop: "16px",
  },
  progress: {
    marginLeft: "10px",
  },
}));

// interface LocationState {
//   from: {
//     pathname: string;
//   };
// }

interface InputVars {
  profile: string;
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const appContext = useAppContext();
  const history = useHistory();

  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const [loginMutation, { loading }] = useMutation<any, InputVars>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        const { isValid, jwtToken, refreshToken } = data.login;
        if (isValid) {
          appContext.loginUser(jwtToken, refreshToken);
          history.push("/todos");
        }
      },
      onError: (error) => {},
    }
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation({
      variables: {
        profile: "59a728ee56814c6fae14417826d9e0b4",
        username: formData.username,
        password: formData.password,
      },
    });
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") {
      setFormData((prevState) => {
        return {
          ...prevState,
          username: event.target.value,
        };
      });
    }
    if (event.target.name === "password") {
      setFormData((prevState) => {
        return {
          ...prevState,
          password: event.target.value,
        };
      });
    }
  };
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      alignItems="center"
    >
      <Container maxWidth="sm">
        <Paper className={classes.paper} elevation={3}>
          <form onSubmit={submitHandler} autoComplete="off">
            <Typography variant="h3">Login</Typography>
            <div>
              <TextField
                value={formData.username}
                name="username"
                type="email"
                required
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={changeHandler}
              />
            </div>
            <div>
              <TextField
                value={formData.password}
                name="password"
                type="password"
                required
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={changeHandler}
              />
            </div>
            <Box className={classes.buttons}>
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
                {loading && (
                  <CircularProgress
                    className={classes.progress}
                    color="secondary"
                    size={24}
                  />
                )}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Grid>
  );
};

export default LoginPage;
