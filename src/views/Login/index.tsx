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
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/slices/userSlice";
import { AppDispatch } from "../../store/store";
import { useHistory } from "react-router-dom";
import useStyles from "./login-styles";
import { errorMessages } from "../../constants/errorMessages";

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormLoginValues>({
    defaultValues: {
      userName: "",
      password: "",
    },
    reValidateMode: "onSubmit",
  });

  const handleLogin = (data: FormLoginValues) => {
    dispatch(loginThunk(data));
  };

  return (
    <Page headerTitle={"Sign in"}>
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
              name="userName"
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
                  id="userName"
                  label="userName"
                  error={!!error}
                  helperText={error?.type ? errorMessages?.[error.type] : ""}
                  name={name}
                  value={value}
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
                  value={value}
                  label="Password"
                  error={!!error}
                  helperText={error?.type ? errorMessages?.[error.type] : ""}
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
                <Link
                  onClick={() => {
                    history.push("/register");
                  }}
                  className={classes.link}
                  variant="body2"
                >
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
