import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core";

export const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    filtersContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      [theme.breakpoints.up(700)]: {
        flex: 1,
        width: "auto",
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up(1129)]: {
        flexDirection: "row",
      },
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      marginBottom: 10,
      [theme.breakpoints.up(1129)]: {
        "&.MuiTypography-root": {
          marginRight: theme.spacing(10),
          marginBottom: 0,
        },
      },
    },
    createBtn: {
      display: "flex",
      alignSelf: "flex-end",
      marginTop: 10,
      [theme.breakpoints.up(1129)]: {
        marginTop: 0,
        alignSelf: "center",
      },
    },
    hidden: {
      display: "none",
    },
  })
);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export const useTableFilterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      [theme.breakpoints.up(1129)]: {
        flexDirection: "row",
      },
    },
    formControl: {
      // marginTop: theme.spacing(1),
      minWidth: 120,
    },
    orderType: {
      width: 200,
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 20,
      // [theme.breakpoints.up(1129)]: {
      //   marginRight: "auto",
      // },
    },
    inputsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      width: "100%",
      [theme.breakpoints.up(700)]: {
        flexDirection: "row",
        marginRight: "0px",
        width: "auto",
      },
      [theme.breakpoints.up(1129)]: {
        flexDirection: "row",
        marginRight: "4px",
      },
    },
    input: {
      width: "100%",
      minWidth: "140px",
    },
  })
);
