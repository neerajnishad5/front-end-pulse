// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

// importing header css
import "./Header.css";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../slices/loginSlice";
import westagilelogo from "../images/navbarLogo.png";

export default function Header() {
  // initialize dispatch function
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const data = useSelector((state) => state.login);

  const logout = () => {
    // clear token from session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("status");

    // dispatch clear state
    dispatch(clearState());
  };
  return (
    <nav className="header-area navbar ">
      <div className="navbar-header">
        <a href="/">
          <img
            width="130px"
            className="navbar-brand bg-light ms-4"
            src={westagilelogo}
            alt="westAgileLab"
          />
        </a>
      </div>
      {data.status === "success" ? (
        <ul className="nav p-3 header display">
          <li className="nav-item me-1">
            <p className="text-white nav-item">Welcome, {data.userObj.email}</p>
          </li>
          {/* login and logout link using ternary operator */}
          <li className="nav-item ms-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              to="/"
              onClick={logout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav header display">
          <li className="nav-item">
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

          {/* login link */}
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

          {/* about us link */}
          <li className="nav-item ms-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              to="https://www.westagilelabs.com/about/"
              target="_blank"
              rel="noopener noreferrer"
            >
              About us
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
