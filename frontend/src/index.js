import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import AuthProvider from "./context/authcontext"; // fixed typo (if applicable)
import store from "./redux/store"; // keep only ONE store import

import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
);
