import { Route, Switch } from "react-router-dom";
import Home from "../views/Home";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/orders" component={Home} />
      <Route exact path="/orders/create" component={Home} />
      <Route exact path="/orders/edit" component={Home} />
      <Route exact path="/orders/delete" component={Home} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default AppRoutes;
