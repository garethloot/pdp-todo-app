import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { useHistory } from "react-router";

import getErrorText from "../helpers/getErrorText";
import { Link } from "react-router-dom";

import { SIGNUP_MUTATION } from "../queries";

// import { useLocation } from "react-router-dom";

import {
  Grid,
  Container,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "../components";
import { Alert } from "../components";

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
    marginTop: "16px",
  },
  progress: {
    marginLeft: "10px",
  },
  names: {
    display: "flex",
    justifyContent: "space-between",
  },
  inputMargin: {
    marginRight: theme.spacing(1),
  },
}));

interface InputVars {
  input: {
    form_data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  };
}

const SignupPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>({ firstName: "", lastName: "", email: "", password: "" });

  const [signupMutation, { loading, error }] = useMutation<any, InputVars>(
    SIGNUP_MUTATION,
    {
      onCompleted: (data) => {
        history.push("/login");
      },
      onError: (error) => {},
    }
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    signupMutation({
      variables: {
        input: {
          form_data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          },
        },
      },
    });
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const errorText = getErrorText(error);

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
            <Typography variant="h3">Signup</Typography>
            <div className={classes.names}>
              <TextField
                value={formData.firstName}
                label="First name"
                variant="outlined"
                margin="normal"
                type="text"
                name="firstName"
                onChange={changeHandler}
                required
                requiredErrorText="This field is required"
                fullWidth
                end
              />
              <TextField
                value={formData.lastName}
                label="Last name"
                variant="outlined"
                margin="normal"
                type="text"
                name="lastName"
                onChange={changeHandler}
                required
                requiredErrorText="This field is required"
                fullWidth
              />
            </div>
            <div>
              <TextField
                value={formData.email}
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                name="email"
                onChange={changeHandler}
                required
                requiredErrorText="This field is required"
                fullWidth
              />
            </div>
            <div>
              <TextField
                value={formData.password}
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                name="password"
                onChange={changeHandler}
                required
                requiredErrorText="This field is required"
                fullWidth
              />
            </div>
            <div>
              {errorText && <Alert severity="error" text={errorText} />}
            </div>
            <Box className={classes.buttons}>
              <Button
                className={classes.inputMargin}
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Signup
                {loading && (
                  <CircularProgress
                    className={classes.progress}
                    color="secondary"
                    size={24}
                  />
                )}
              </Button>
              <Link to="/login">Login</Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Grid>
  );
};

export default SignupPage;
