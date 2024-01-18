import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home/index.jsx";
import Detail from "./pages/Detail/index.jsx";
import Category from "./pages/Category/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/category/:category",
    element: <Category />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>
);
