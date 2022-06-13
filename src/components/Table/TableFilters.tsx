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
import { useDispatch } from "react-redux";
import { errorMessages } from "../../constants/errorMessages";
import { ORDER_TYPES } from "../../constants/orders";
import { IOrderSearch, OrderType } from "../../models/order.model";
import { searchOrdersThunk } from "../../store/slices/ordersSlice";
import { AppDispatch } from "../../store/store";
import { useTableFilterStyles } from "./table-styles";
import { IFilterData } from "./table-types";

interface ITableFilter {
  onSearch?: (searchQuery: IOrderSearch) => void;
}

const getDefaultValues = (): IFilterData => ({
  customerName: "",
  orderId: "",
  orderType: "",
});

const TableFilters: React.FC<ITableFilter> = () => {
  const classes = useTableFilterStyles();
  const dispatch = useDispatch<AppDispatch>();

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

  const onSubmit = (data: IFilterData) => {
    if (Object.keys(errors).length) return;
    let query: IOrderSearch = {};
    if (data.customerName) query.customerName = data.customerName;
    if (data.orderId) query.orderId = +data.orderId;
    if (data.orderType !== "") query.orderType = data.orderType;

    dispatch(searchOrdersThunk(query));
  };

  return (
    <Grid container className={classes.root} alignItems="center" spacing={2}>
      <Grid item className={classes.inputsContainer}>
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
                className={classes.input}
                variant="outlined"
                id="searchOrderId"
                label="Order ID"
                type="number"
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
                className={classes.input}
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
                className={classNames(classes.formControl, classes.input)}
                required
              >
                <InputLabel id="orderTypeSearch">Order Type</InputLabel>
                <Select
                  className={classes.input}
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
      </Grid>
      <Grid item className={classes.buttonsContainer}>
        <Grid item>
          <Button onClick={onClearFilters} color="secondary" variant="outlined">
            Clear
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TableFilters;
