import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { useGlobalContext } from "./context";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CertCreationPage from "./pages/CertCreationPage";
import RegisterPage from "./pages/RegisterPage";
import React from "react";

function App() {
  const {
    state: { alerts, user, loading },
    loadUser,
  } = useGlobalContext();
  React.useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <>
      <Navbar />
      {alerts.length > 0 && (
        <>
          {alerts.map((alert) => {
            return (
              <div
                key={alert.id}
                id={`alert-${alert.type}`}
                className="absolute bottom-8 border-2 border-white rounded-sm py-3 px-6 right-8"
              >
                {alert.msg}
              </div>
            );
          })}
        </>
      )}
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={"/login"}>
          {user && !loading ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route exact path={"/register"}>
          {user && !loading ? <Redirect to="/" /> : <RegisterPage />}
        </Route>
        <PrivateRoute path={"/profile"} component={ProfilePage} />
        <PrivateRoute path={"/cert-creation"} component={CertCreationPage} />
      </Switch>
    </>
  );
}

export default App;
