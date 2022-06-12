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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
import React from "react";
import Link from "@material-ui/core/Link";
import Page from "../../components/Page";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useForm, Controller } from "react-hook-form";
import { arePasswordsEqual, onKeyDown } from "../../utils/utility";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../store/slices/userSlice";
import { AppDispatch } from "../../store/store";
import { useHistory, useParams } from "react-router-dom";
import useStyles from "./order-form-styles";
import { errorMessages } from "../../constants/errorMessages";
import { OrderFormValues } from "./order-form-types";
import { OrderType } from "../../models/order.model";
import { ORDER_TYPES } from "../../constants/orders";
import { createOrderThunk } from "../../store/slices/ordersSlice";

const OrderForm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm<OrderFormValues>({
    defaultValues: {
      orderType: OrderType.Standard,
      customerName: "",
    },
    reValidateMode: "onChange",
  });

  const test = () => {
    console.log(getValues());
    console.log(isValid);
  };

  const handleRegister = (data: OrderFormValues) => {
    console.log("here");
    console.log(isValid);
    console.log(errors);
    if (isValid) {
      dispatch(createOrderThunk(data)).then(() => {
        history.push("/");
      });
    }
  };

  const orderType = id ? "Update Order" : "Create Order";

  return (
    <Page headerTitle={orderType}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            {orderType}
          </Typography>
          <div className={classes.form}>
            <Controller
              control={control}
              name="customerName"
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
                  id="customerName"
                  label="Customer"
                  error={!!error}
                  helperText={error?.type ? errorMessages?.[error.type] : ""}
                  name={name}
                  ref={ref}
                  onChange={onChange}
                  autoFocus
                />
              )}
            />
            <Controller
              control={control}
              name="orderType"
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { error },
                formState,
              }) => (
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                  required
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Order Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={value}
                    onChange={onChange}
                    label="order Type"
                    ref={ref}
                  >
                    {Object.entries(ORDER_TYPES).map(([key, value]) => (
                      <MenuItem key={key} value={value}>
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit(handleRegister)}
            >
              {id ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default OrderForm;
