import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// plain js find the empty div in index.html
const el = document.getElementById("root");

// hand it to react to inject our JSX into it
const root = ReactDOM.createRoot(el);

// render our React project in the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
