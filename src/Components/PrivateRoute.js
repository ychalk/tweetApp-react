import React, { useContext, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import AppContext from "../Context/AppContext";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
const appContext = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (!appContext.user) {
          return <Redirect to={"/login"} />;
        } else {
          return <RouteComponent {...routeProps} />;
        }
      }}
    />
  );
};

export default PrivateRoute;