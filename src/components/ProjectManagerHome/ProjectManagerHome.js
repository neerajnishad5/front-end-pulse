import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ProjectManagerHome.css";
import RaiseProjectConcern from "./RaiseProjectConcern";
import RaiseProjectUpdate from "./RaiseProjectUpdate";
import detailButton from "../images/details.svg";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProjectManagerHome() {
  // get data from store
  const data = useSelector((state) => state.login);
  const [managerName, setManagerName] = useState("");

  console.log("data obj: ", data);
  const projectManagerId = data.userObj.userId;

  console.log(projectManagerId);

  const token = sessionStorage.getItem("token");

  // console.log("token from projectmanager", token);

  // post update status
  const [updateMsg, setUpdateMsg] = useState("");

  // get all project under project manager
  const [projects, setProjects] = useState([]);

  // gettin project list
  const getProjectList = async () => {
    const projectList = await axios.get(
      `http://localhost:5000/project-manager/all-projects/${projectManagerId}`,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );

    // console.log("sfdads", projectList);
    setProjects(projectList.data.payload);
  };

  // get project concerns
  const getProjectConcerns = async () => {
    let res = await axios.get(`http://localhost:5000/project-manager/1`, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });
  };

  // useNavigate hook to navigate to detailed projects
  const navigate = useNavigate();

  const navigateToDetailedView = (projectId) => {
    navigate(`project-details/${projectId}`);
  };

  // useEffect get all data from projects TABLE
  useEffect(() => {
    getProjectList();
    setManagerName(data.userObj.name);
  }, []);

  return (
    <div className="container container-paint p-2">
      <div className="first-class">
        <h2 className="mb-4">Welcome Project Manager {managerName}</h2>
        <h3 className="text-primary">{updateMsg}</h3>
        <div className="row justify-content-center">
          <div className="col-sm-4 col-md-6 col-lg-4">
            <RaiseProjectConcern />
          </div>

          <div className="col-sm-4 col-md-6 col-lg-4">
            <RaiseProjectUpdate
              managerName={managerName}
              updateMsg={updateMsg}
              setManagerName={setManagerName}
              setUpdateMsg={setUpdateMsg}
            />
          </div>
        </div>
      </div>

      <div className="project-list">
        {projects?.length > 0 && (
          <div className="table-responsive">
            <h2>Projects under Project manager</h2>
            <table className="table table-hover table-striped border">
              <thead>
                <tr>
                  <th scope="col">Project ID</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Client Account Manager</th>
                  <th scope="col">Project Status</th>
                  <th scope="col">Project Start Date</th>
                  <th scope="col">Project End Date</th>
                  <th scope="col">Project Fitness Indicator</th>
                  <th scope="col">Project Domain</th>
                  <th scope="col">Project Type</th>
                  <th scope="col">GDO ID</th>
                  <th scope="col">Project Manager</th>
                  <th scope="col">Detailed view</th>
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
                          onClick={() =>
                            navigateToDetailedView(project.projectId)
                          }
                          className="btn btn-sm btn-success"
                        >
                          <img width="25px" src={detailButton} alt="" />
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
