import axios from "axios";
import { useState, useEffect } from "react"; 
import {   useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GdoHome.css";
import RaiseResourcingRequest from "./RaiseResourcingRequest";
import AssignProject from "./AssignProject";
import detailButton from "../images/details.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import editButton from "../images/edit.svg";

export default function GdoHome() {
  const data = useSelector((state) => state.login);
  const [projects, setProjects] = useState([]);

  const gdoId = data.userObj.userId; 
  // states for modal

  console.log("data in gdohome", data);

  const token = sessionStorage.getItem("token");
  // console.log("Token from super admin: ", token);

  const getProjects = async () => {
    // get users list from users table
    const projectsList = await axios.get(
      `http://localhost:5000/gdo/${gdoId}/all-projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProjects(projectsList.data.payload);
  };

  const navigate = useNavigate();

  const navigateToDetailed = (projectId) => {
    console.log("project id in navigate: ", projectId);
    navigate(`project-details/${projectId}`);
  };
  const [show, setShow] = useState(false);

  // useEffect get all data from projects TABLE
  useEffect(() => {
    getProjects();
  }, []);
  // return react element
  return (
    <div className="container">
      <h2 className="text-dark p-3 mb-2 rounded">
        Welcome GDO {data.userObj.name}
      </h2>
      <div className="row justify-content-center">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <RaiseResourcingRequest show={show} setShow={setShow} />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <AssignProject getProjects={getProjects} />
        </div>
      </div>

      <div>
        {projects?.length > 0 && (
          <div className="table-responsive">
            <h2 className="text-dark w-33 p-3 rounded">Projects Under GDO</h2>
            <table className="table  table-striped border ms-4 me-4">
              <thead className="thead">
                <tr>
                  <th scope="col">Project Id</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Client Account Manager</th>
                  <th scope="col">Project Status</th>
                  <th scope="col">Project Start Date</th>
                  <th scope="col">Project EndDate</th>
                  <th scope="col">Project Fitness Indicator</th>
                  <th scope="col">Project Domain</th>
                  <th scope="col">Project Type</th>
                  <th scope="col">GDO ID</th>
                  <th scope="col">Project Manager</th>
                  <th scope="col">Detailed View</th>{" "}
                  <th scope="col">Update Project</th>
                </tr>
              </thead>

              <tbody>
                {projects?.map((project, index) => {
                  return (
                    <tr key={index}>
                      <td>{project.projectId}</td>
                      <td>{project.projectName}</td>
                      <td>{project.clientName}</td>
                      <td>{project.clientAccountManager}</td>
                      <td>{project.projectStatus}</td>
                      <td>{project.projectStartDate}</td>
                      <td>{project.projectEndDate}</td>
                      <td>{project.projectFitnessIndicator}</td>
                      <td>{project.projectDomain}</td>
                      <td>{project.projectType}</td>
                      <td>{project.gdoId}</td>
                      <td>{project.projectManager}</td>
                      <td>
                        <button
                          onClick={() => navigateToDetailed(project.projectId)}
                          className="btn btn-success btn-sm"
                        >
                          <img width="25px" src={detailButton} alt="" />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(`/update-project/${project.projectId}`)
                          }
                          className="btn btn-success"
                        >
                          <img width="20px" src={editButton} alt="" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
