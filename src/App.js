import "./App.css";

// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

// importing browser router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import RootLayout from "./components/RootLayout/RootLayout";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Home from "./components/Home/Home";
import SuperAdminHome from "./components/SuperAdminHome/SuperAdminHome";
import SpecialUser from "./components/SpecialUserHome/SpecialUserHome";
import ProjectManager from "./components/ProjectManagerHome/ProjectManagerHome";
import GdoHome from "./components/GdoHome/GdoHome";

// import { useSelector } from "react-redux";

export default function App() {
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "super-admin",
          element: <SuperAdminHome />,
        },

        {
          path: "special-user",
          element: <SpecialUser />,
        },
        {
          path: "project-manager",
          element: <ProjectManager />,
        },
        {
          path: "gdo",
          element: <GdoHome />,
        },
      ],
    },
  ]);

  // returning react element
  return (
    <div className="App">
      <div>
        <RouterProvider router={browserRouterObj}></RouterProvider>
      </div>
    </div>
  );
}
