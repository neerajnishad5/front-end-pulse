// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

// importing WAL picture
import walPicture from "../images/walsave.svg";

// importing css for homejs
import "./Home.css";

// importing useEffect hook
import { useEffect } from "react";

// exporting root layout component
export default function Home() {
  useEffect(() => {
    document.title = "HOME | PULSE";
  }, []);
  return (
    <>
      <div className="row home d-flex justify-content-around align-items-center p-3">
        <div className="col-sm-12 col-md-6 col-lg-4 ">
          <img
            src={walPicture}
            alt="wal picture"
            className="img-responsive image-margin"
            width={"530px"}
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 ">
          <p className="home-text">
            WAL Pulse is a tool developed and designed to make the process of
            maintaining and managing projects, based on the pariticular roles,
            smooth and simpler.
            <b> Project Managers, Super Admin, GDO Heads and Admin </b>
            are able to login and perform specific assignments.
          </p>
        </div>
      </div>
    </>
  );
}
