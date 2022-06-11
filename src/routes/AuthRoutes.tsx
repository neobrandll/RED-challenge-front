import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../views/Home";

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/register" component={Home} />
      <Route exact path="/" component={Home} />
      <Route path="/" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AuthRoutes;
