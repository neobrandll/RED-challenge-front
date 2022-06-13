import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      borderRadius: "5px",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    title: {
      textAlign: "center",
    },
  })
);

export default useStyles;
