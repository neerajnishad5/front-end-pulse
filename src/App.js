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
