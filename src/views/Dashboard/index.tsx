import {
  Button,
  Grid,
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
import { useHistory } from "react-router-dom";
import Page from "../../components/Page";
import EnhancedTable from "../../components/Table/Index";
import { RootState } from "../../store/rootReducer";
import { getAllOrdersThunk } from "../../store/slices/ordersSlice";
import { AppDispatch } from "../../store/store";
import useStyles from "./dashboard-styles";

const Dashboard: React.FC = () => {
  const classes = useStyles();

  const orders = useSelector((state: RootState) => state.orders.orders);
  const history = useHistory();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllOrdersThunk());
  }, []);

  //   const toolbar = (
  //     <Grid justifyContent="flex-end" container spacing={3}>
  //       <Button
  //         color="primary"
  //         variant="outlined"
  //         onClick={() => {
  //           history.push("/create");
  //         }}
  //         className={classes.link}
  //       >
  //         Create
  //       </Button>
  //     </Grid>
  //   );

  const onCreateHandler = () => {
    history.push("/orders/create");
  };

  const onEditHandler = (id: string) => {
    history.push(`/orders/edit/${id}`);
  };

  return (
    <Page headerTitle={"Dashboard"}>
      <>
        {orders && !!orders.length && (
          <EnhancedTable
            toolbarProps={{
              onCreate: onCreateHandler,
              onEdit: onEditHandler,
            }}
            rows={orders}
          />
        )}
      </>
    </Page>
  );
};

export default Dashboard;
