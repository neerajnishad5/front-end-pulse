// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

// importing header css
import "./Header.css";

import { NavLink } from "react-router-dom";

const logout = () => {
  // clear token from session storage
  sessionStorage.removeItem("token");
};

const loginStatus = () => {
  const token = sessionStorage.getItem("token");
  return token.length > 0;
};

export default function Header() {
  return (
    <nav className="bg-dark">
      {loginStatus === true ? (
        <ul className="nav justify-content-end p-3 header display">
          {/* login and logout link using ternary operator */}
          <li className="nav-item ms-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              to="login"
              onClick={logout}
            >
              Logout
            </NavLink>
          </li>{" "}
        </ul>
      ) : (
        <ul className="nav justify-content-end p-3 header display">
          
          <li className="nav-item ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          {/* register link */}
          <li className="nav-item ms-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              to="register"
            >
              Register
            </NavLink>
          </li>

           {/* register link */}
           <li className="nav-item ms-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              to="login"
            >
              Login
            </NavLink>
          </li>
          
        </ul>
      )}
    </nav>
  );
}
