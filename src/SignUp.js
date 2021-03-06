import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import history from "./history";

// MATERIAL UI SHIT
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a
        color="inherit"
        href="http://www.tommywantwingyatx.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tommy Want Wingy
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePhoneNumberChange = e => {
    setPhoneNumber(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const api = `http://localhost:3000/api/v1/customers`;

    const customer = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      password: password
    };
    await axios.post(api, { customer }).then(res => {
      localStorage.setItem("customer", JSON.stringify(res.data.customer));
      localStorage.setItem("jwt", res.data.jwt);
      history.push("/");
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => handleFirstNameChange(e)}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => handleLastNameChange(e)}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => handleEmailChange(e)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => handlePhoneNumberChange(e)}
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="(xxx)-xxx-xxxx"
                name="phoneNumber"
                autoComplete="phoneNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => handlePasswordChange(e)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
