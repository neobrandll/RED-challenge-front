import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Box,
  makeStyles,
} from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
import React from "react";
import Link from "@material-ui/core/Link";
import Page from "../../components/Page";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useForm, Controller } from "react-hook-form";
import { FormLoginValues } from "./login-types";
import { onKeyDown } from "../../utils/utility";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormLoginValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    reValidateMode: "onSubmit",
  });

  const handleLogin = (data: FormLoginValues) => {
    console.log(data);
  };

  return (
    <Page headerTitle={"Login"}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <Controller
              control={control}
              name="username"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
                formState,
              }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  error={!!error}
                  helperText={error?.message}
                  name={name}
                  ref={ref}
                  onChange={onChange}
                  autoFocus
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
                formState,
              }) => (
                <TextField
                  variant="outlined"
                  type="password"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  error={!!error}
                  helperText={error?.message}
                  name={name}
                  ref={ref}
                  onChange={onChange}
                  autoFocus
                />
              )}
            />
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            /> */}
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit(handleLogin)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Page>
  );
};

export default Login;
