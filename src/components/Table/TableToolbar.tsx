import { Toolbar, Typography, Tooltip, IconButton } from "@material-ui/core";
import { useToolbarStyles } from "./table-styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";

import clsx from "clsx";

interface EnhancedTableToolbarProps {
  selected: number[];
  children?: JSX.Element | JSX.Element[];
  onCreate?: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number[]) => void;
}

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
  const classes = useToolbarStyles();
  const { selected, children, onCreate, onEdit, onDelete } = props;

  const numSelected = selected?.length || 0;

  let buttons = (
    <Tooltip title="Filter list">
      <>
        <IconButton onClick={onCreate} aria-label="create">
          <AddBoxIcon />
        </IconButton>
      </>
    </Tooltip>
  );

  if (selected?.length === 1) {
    buttons = (
      <>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              onEdit && onEdit(selected[0]);
            }}
            aria-label="create"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              onDelete && onDelete(selected);
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    );
  } else if (selected?.length > 1) {
    buttons = (
      <>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              onDelete && onDelete(selected);
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    );
  }

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
      {buttons}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
