import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../components/Page";
import EnhancedTable from "../../components/Table/Index";
import { RootState } from "../../store/rootReducer";
import { getAllOrdersThunk } from "../../store/slices/ordersSlice";
import { AppDispatch } from "../../store/store";
import useStyles from "./dashboard-styles";

const Dashboard: React.FC = () => {
  const classes = useStyles();

  const orders = useSelector((state: RootState) => state.orders.orders);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("aaa");
    dispatch(getAllOrdersThunk());
  }, []);

  return (
    <Page headerTitle={"Dashboard"}>
      <>{orders && !!orders.length && <EnhancedTable rows={orders} />}</>
    </Page>
  );
};

export default Dashboard;
