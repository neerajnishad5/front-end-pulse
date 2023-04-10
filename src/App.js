// importing CSS for App file
import "./App.css";

// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

// importing browser router
import { createBrowserRouter, RouterProvider } from "react-router-dom";


// importing components
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
import ProjectsList from "./components/ProjectsList/ProjectsList";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";
import RaiseProjectConcern from "./components/ProjectManagerHome/RaiseProjectConcern";
import RaiseProjectUpdate from "./components/ProjectManagerHome/RaiseProjectUpdate";
import UpdateProject from "./components/GdoHome/UpdateProject";


// exporting App function
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
          path: "superAdmin/:email",
          element: <SuperAdminHome />,
        },

        {
          path: "specialUser/:email",
          element: <SpecialUser />,
          children: [{ path: "projects", element: <ProjectsList /> }],
        },
        {
          path: "projectManager/:email",
          element: <ProjectManager />,
          children: [
            {
              path: "raise-project-concern",
              element: <RaiseProjectConcern />,
            },
            {
              path: "raise-project-update",
              element: <RaiseProjectUpdate />,
            },
          ],
        },
        {
          path: "gdo/:email/",
          element: <GdoHome />,
        },
        {
          path: "projects",
          element: <ProjectsList />,
        },

        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: ":role/:email/project-details/:id",
          element: <ProjectDetails />,
        },
        {
          path: "update-project/:id",
          element: <UpdateProject />,
        },
        {
          path: "reset-password/:email/:token",
          element: <ResetPassword />,
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
