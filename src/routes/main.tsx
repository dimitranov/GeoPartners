import { Route } from "react-router";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

const PlaceHolder = () => <p>PLaceholder</p>;
export const mainRouteConfig = [
  {
    path: "/registration",
    component: Registration,
    routeType: AuthRoute,
  },
  {
    path: "/login",
    component: Login,
    routeType: AuthRoute,
  },
  {
    path: "/",
    component: Dashboard,
    routeType: Route,
  },
  {
    path: "/private",
    component: PlaceHolder,
    routeType: PrivateRoute,
  },
];
