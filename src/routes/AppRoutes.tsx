import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Home from "../views/Home";
import OrderForm from "../views/OrderForm";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/orders" component={Dashboard} />
      <Route exact path="/orders/create" component={OrderForm} />
      <Route exact path="/orders/edit/:id" component={OrderForm} />
      <Route exact path="/orders/delete" component={Home} />
      {/* <Route path="/" component={Home} /> */}
      <Route path="/" render={() => <Redirect to="/orders" />} />
    </Switch>
  );
};

export default AppRoutes;
