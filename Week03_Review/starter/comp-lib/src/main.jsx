import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}+{" "}
    {/* BrowserRouter has to wrap anything that uses Link or Routes */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
