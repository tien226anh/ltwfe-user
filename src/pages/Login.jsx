import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40vh",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username, password });
      const { status_code, detail } = response.data;

      if (status_code === 200) {
        const { role, username, full_name, avatar_url } = detail;
        localStorage.setItem(
          "user",
          JSON.stringify({ role, username, full_name, avatar_url })
        );
        localStorage.setItem("role", detail.role);
        navigateTo("/");
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API login
      setErrorMessage("Failed to login");
    }
    console.log();
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleLogin}>
        <Typography variant="h5" component="h2" className={classes.title}>
          Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className={classes.button}
            >
              Login
            </Button>
          </Grid>
          {errorMessage && (
            <Grid item xs={12}>
              <Typography variant="body2" className={classes.error}>
                {errorMessage}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  );
};

export default Login;
