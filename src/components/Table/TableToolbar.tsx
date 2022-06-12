import { Toolbar, Typography, Tooltip, IconButton } from "@material-ui/core";
import { useToolbarStyles } from "./table-styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";

import clsx from "clsx";

interface EnhancedTableToolbarProps {
  numSelected: number;
  children?: JSX.Element | JSX.Element[];
  onCreate?: () => void;
}

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, children, onCreate } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Orders
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <>
            <IconButton onClick={onCreate} aria-label="creaate">
              <AddBoxIcon />
            </IconButton>
          </>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
