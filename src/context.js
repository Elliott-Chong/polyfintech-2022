import axios from "axios";
import React, { createContext, useContext, useCallback } from "react";
import { initialState, reducer } from "./reducer";
import { v4 } from "uuid";
const AppContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => console.log(state), [state]);

  const loadUser = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
      } else {
        delete axios.defaults.headers.common["x-auth-token"];
        dispatch({ type: "CLEAR_USER" });
      }
      const response = await axios.get("/api/auth/user");
      dispatch({ type: "SET_USER", payload: response.data });
    } catch (error) {
      dispatch({ type: "CLEAR_USER" });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  const setAlert = (type, msg) => {
    const id = v4();
    dispatch({
      type: "SET_ALERT",
      payload: { type, msg, id },
    });
    setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: { id } }), 2000);
  };
  // Authenticate User
  const loginUser = async (email, password, history) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, password });
    try {
      const response = await axios.post("/api/auth/login", body, config);
      dispatch({ type: "SET_TOKEN", payload: response.data.token });
      history.push("/");
    } catch (error) {
      if (error.response.status === 401) {
        return setAlert("danger", "Invalid Credentials");
      }
      // console.log(error.response);
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      // console.error(error);
    }
  };

  const logout = () => {
    dispatch({ type: "CLEAR_USER" });
    setAlert("success", "Logged Out!");
  };
  const registerUser = async (
    email,
    username,
    password,
    password2,
    history
  ) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, username, password, password2 });
    try {
      const response = await axios.post("/api/auth/register", body, config);
      setAlert("success", "Account Created!");
      dispatch({ type: "SET_TOKEN", payload: response.data.token });
      loadUser();
      history.push("/login");
    } catch (error) {
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  };

  const fetchListings = useCallback(async () => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await axios.get("/api/listing");
      dispatch({ type: "SET_LISTINGS", payload: response.data });
    } catch (error) {
      console.log(error.response);
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  }, []);

  const fetchSingleListing = useCallback(async (id) => {
    try {
      const response = await axios.get(`/api/listing/${id}`);
      dispatch({ type: "SET_LISTING", payload: response.data });
    } catch (error) {
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  }, []);

  const createListing = async (
    location,
    date,
    sport,
    slotsLeft,
    remarks,
    history
  ) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({
      location,
      date,
      sport,
      slotsLeft,
      remarks,
    });
    try {
      await axios.post("/api/listing", body, config);
      history.push("/");
      setAlert("success", "Listing Created!");
    } catch (error) {
      console.log(error.response);
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        loginUser,
        loadUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export default Context;
export { useGlobalContext };
