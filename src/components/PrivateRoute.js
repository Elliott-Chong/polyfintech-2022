import React from "react";
import { Redirect, Route } from "react-router";
import { useGlobalContext } from "../context";

const PrivateRoute = ({ path, component: Component }) => {
  const {
    loadUser,
    state: { user, loading },
  } = useGlobalContext();
  React.useEffect(() => {
    loadUser();
  }, []);
  return (
    <Route
      path={path}
      exact
      //   component={(props) =>
      //     user ? <Component {...props} /> : <Redirect to="/login"></Redirect>
      //   }
    >
      {!(user || loading) ? <Redirect to={"/login"} /> : <Component />}
    </Route>
  );
};

export default PrivateRoute;
