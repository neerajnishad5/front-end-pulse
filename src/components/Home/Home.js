// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "../Register/Register";
import Container from "react-bootstrap/Container";
import testing from "../images/testing.svg";
import "./Home.css";

// exporting root layout component
export default function Home() {
  return (
    <div className=" ">
      <div className="row home d-flex justify-content-around align-items-center p-3">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <h2
            style={{ width: "530px", backgroundColor: "#4CA383" }}
            className=" text-white text-center p-3"
          >
            WAL PULSE
          </h2>
          <img
            src={testing}
            alt=""
            className="img-responsive"
            width={"530px"}
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 ">
          <p className="display-6">
            WAL Pulse is a tool developed and designed to make the process of
            maintaining projects and managing projects, based on the pariticular
            roles, smooth and simpler.
            <b> Project Managers, Super Admin, GDO Heads and Admin </b>
            who are able to login and perform specific assignments.
          </p>
        </div>
      </div>
    </div>
  );
}
