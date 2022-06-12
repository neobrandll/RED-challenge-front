import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import classNames from "classnames";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { errorMessages } from "../../constants/errorMessages";
import { ORDER_TYPES } from "../../constants/orders";
import { OrderType } from "../../models/order.model";
import { useTableFilterStyles } from "./table-styles";
import { IFilterData } from "./table-types";

const getDefaultValues = (): IFilterData => ({
  customerName: "",
  orderId: "",
  orderType: "",
});

const TableFilters: React.FC = () => {
  const classes = useTableFilterStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IFilterData>({
    defaultValues: getDefaultValues(),
    reValidateMode: "onSubmit",
  });
  const onClearFilters = () => {
    reset(getDefaultValues());
  };

  return (
    <Grid container className={classes.root} alignItems="center" spacing={2}>
      <Grid item>
        <Controller
          control={control}
          name="orderId"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
            formState,
          }) => (
            <TextField
              variant="outlined"
              id="searchOrderId"
              label="Order ID"
              error={!!error}
              helperText={error?.type ? errorMessages?.[error.type] : ""}
              value={value}
              name={name}
              ref={ref}
              onChange={onChange}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="customerName"
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
            formState,
          }) => (
            <TextField
              variant="outlined"
              id="searchCustomerName"
              label="Search Customer"
              error={!!error}
              helperText={error?.type ? errorMessages?.[error.type] : ""}
              value={value}
              name={name}
              ref={ref}
              onChange={onChange}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="orderType"
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
            formState,
          }) => (
            <FormControl
              variant="outlined"
              className={classNames(classes.formControl, classes.orderType)}
              required
            >
              <InputLabel id="orderTypeSearch">Order Type</InputLabel>
              <Select
                labelId="orderTypeSearch"
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
      </Grid>

      <Grid item>
        <Button onClick={onClearFilters} color="secondary" variant="outlined">
          Clear
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default TableFilters;
