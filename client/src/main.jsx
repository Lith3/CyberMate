import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import SignUp from "./pages/sign_up/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/inscription", element: <SignUp /> }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
