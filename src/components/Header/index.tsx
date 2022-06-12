import React from "react";
import RedTechIcon from "../../assets/images/RED_TECH_Icon_Full_Color.png";
import "../../App.css";
import { colors } from "../../shared/colors";
import { layout } from "../../shared/layout";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import { Button } from "@material-ui/core";
import useStyles from "./header-styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { logout } from "../../store/slices/userSlice";
import { useHistory } from "react-router-dom";

interface IProps {
  label: string;
}
export default function Header(props: IProps) {
  const { label } = props;
  const classes = useStyles();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: layout.standardComponentPadding,
        alignItems: "center",
        borderBottom: `1px solid ${colors.brandLightGray}`,
      }}
    >
      <img
        src={RedTechIcon}
        className="headerLogo"
        alt="logo"
        style={{ marginRight: "16px" }}
      />
      <span className="headerFont" style={{ color: colors.brandDarkGray }}>
        {label}
      </span>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
      >
        {/* <SettingsIcon style={{ marginLeft: "16px" }} fontSize="large" /> */}
        {/* <AccountCircleIcon style={{ marginLeft: "16px" }} fontSize="large"  /> */}
        {isAuth && (
          <Button
            color="primary"
            variant="outlined"
            onClick={onLogoutHandler}
            className={classes.link}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
