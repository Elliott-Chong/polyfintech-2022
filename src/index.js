import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContext from "./context";
import axios from "axios";
axios.defaults.baseURL = "https://portbonder.elliott-project.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AppContext>
      <App />
    </AppContext>
  </Router>
);
