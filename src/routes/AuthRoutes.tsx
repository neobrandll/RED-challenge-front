import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Login} />
      <Route path="/" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AuthRoutes;
