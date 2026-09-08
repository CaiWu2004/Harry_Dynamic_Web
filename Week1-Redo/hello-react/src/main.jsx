import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

// Plain Javascript: find the empty div in index.html
const el = document.getElementById("root");

// Hand it to React. from here on, React owns this div
const root = ReactDOM.createRoot(el);

// A component is a function that returns JSX
// The name Must be capitalized
// function App() {
//   return (
//     <div>
//       {/* curly braces = "this bit is JavaScript" */}
//       <h1>Hello, React</h1>
//       <p>Change this text, hit save, and watch the browser update by itself</p>
//     </div>
//   );
// }

// Render it into the div we just handed over
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
