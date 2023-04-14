// import useRouteError hook from react-router-dom
import { useNavigate, useRouteError } from "react-router-dom";
import { NavLink } from "react-router-dom";

// import header page
import Header from "../Header/Header";

// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
    <div className="text-center">
      <Header />
      <div className="row d-flex justify-content-center align-items-center">
        <h2 className="text-danger">Error occured</h2>
        <div className="col-sm-6 col-md-9 m-5">
          <img
            src="https://atlassianblog.wpengine.com/wp-content/uploads/2017/12/44-incredible-404-error-pages@3x-1560x760.png"
            width={"70%"}
            alt="error-page"
          />
        </div>
      </div>
      <button onClick={() => navigate("/")} className="btn btn-dark btn-lg">
        Home
      </button>
    </div></>
  );
}
