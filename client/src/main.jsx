import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import SignUp from "./pages/sign_up/SignUp";
import LogIn from "./pages/log_in/LogIn";
import TopicsPage from "./pages/topics_page/TopicsPage";
import Profile from "./pages/profile/Profile";
import profileLoader from "./loader/profile/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/inscription", element: <SignUp /> },
      { path: "/connexion", element: <LogIn /> },
      { path: "/topics", element: <TopicsPage /> },
      { path: "/profil", element: <Profile />, loader: profileLoader },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
