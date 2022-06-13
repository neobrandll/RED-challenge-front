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
import Modal from "../../components/Modal";
import { IModal, IModalProps } from "../../components/Modal/modal-types";
import Page from "../../components/Page";
import EnhancedTable from "../../components/Table/Index";
import { IOrderSearch } from "../../models/order.model";
import { RootState } from "../../store/rootReducer";
import {
  deleteOrdersThunk,
  getAllOrdersThunk,
  searchOrdersThunk,
} from "../../store/slices/ordersSlice";
import { AppDispatch } from "../../store/store";
import useStyles from "./dashboard-styles";

const Dashboard: React.FC = () => {
  const classes = useStyles();

  const orders = useSelector((state: RootState) => state.orders.orders);
  const history = useHistory();

  const dispatch = useDispatch<AppDispatch>();

  const [modal, setModal] = React.useState<IModal>({
    open: false,
    title: "",
  });

  const onCreateHandler = () => {
    history.push("/orders/create");
  };

  const onEditHandler = (id: number) => {
    history.push(`/orders/edit/${id}`);
  };

  const onSearchHandler = (searchQuery: IOrderSearch) => {
    dispatch(searchOrdersThunk(searchQuery));
  };

  useEffect(() => {
    dispatch(getAllOrdersThunk());
  }, []);

  const closeModal = () => {
    setModal({
      open: false,
      title: "",
    });
  };

  const handleOpen = (ids: number[], afterDelete: () => void) => {
    const length = ids.length;
    setModal({
      open: true,
      title: `Delete ${length} ${length > 1 ? "items" : "item"} `,
      onConfirm: () => {
        dispatch(deleteOrdersThunk(ids)).then(() => {
          afterDelete();
          closeModal();
        });
      },
      onCancel: closeModal,
    });
  };

  const onDeleteHandler = (ids: number[], afterDelete: () => void) => {
    handleOpen(ids, afterDelete);
  };

  return (
    <Page headerTitle={"Dashboard"}>
      <>
        {orders && !!orders.length && (
          <EnhancedTable
            toolbarProps={{
              onCreate: onCreateHandler,
              onEdit: onEditHandler,
              onDelete: onDeleteHandler,
              onSearch: onSearchHandler,
            }}
            rows={orders}
          />
        )}
        <Modal modal={modal} />
      </>
    </Page>
  );
};

export default Dashboard;
