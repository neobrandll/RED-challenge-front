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
import { FormRegisterValues } from "./register-types";
import { arePasswordsEqual, onKeyDown } from "../../utils/utility";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../store/slices/userSlice";
import { AppDispatch } from "../../store/store";
import { useHistory } from "react-router-dom";
import useStyles from "./register-styles";
import { errorMessages } from "../../constants/errorMessages";

const Register: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm<FormRegisterValues>({
    defaultValues: {
      userName: "",
      password: "",
      repeatPasswordConfirmation: "",
      email: "",
    },
    reValidateMode: "onChange",
  });

  const password = watch("password");

  const handleRegister = (data: FormRegisterValues) => {
    if (Object.keys(errors).length) return;
    dispatch(registerThunk(data));
  };

  return (
    <Page headerTitle={"Sign up"}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Controller
              control={control}
              name="userName"
              rules={{ required: true }}
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
                  ref={ref}
                  onChange={onChange}
                  value={value}
                  autoFocus
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
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
                  id="email"
                  label="Email"
                  error={!!error}
                  helperText={error?.type ? errorMessages?.[error.type] : ""}
                  name={name}
                  ref={ref}
                  onChange={onChange}
                  value={value}
                  autoFocus
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
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
                  helperText={error?.type ? errorMessages?.[error.type] : ""}
                  name={name}
                  ref={ref}
                  onChange={onChange}
                  value={value}
                  autoFocus
                />
              )}
            />
            <Controller
              control={control}
              name="repeatPasswordConfirmation"
              rules={{
                required: true,
                validate: {
                  arePasswordsEqual: (repeatedPassword: string) =>
                    arePasswordsEqual(password, repeatedPassword),
                },
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
                formState,
              }) => (
                <TextField
                  onChange={onChange}
                  type="password"
                  error={!!error}
                  helperText={error?.type ? errorMessages?.[error.type] : ""}
                  name={name}
                  id="repeatPasswordConfirmation"
                  label="Confirm Password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  ref={ref}
                  autoFocus
                  value={value}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit(handleRegister)}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  className={classes.link}
                  onClick={() => {
                    history.push("/");
                  }}
                  variant="body2"
                >
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Page>
  );
};

export default Register;
