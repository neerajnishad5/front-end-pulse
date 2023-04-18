import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

export default function ProjectsList() {
  // projects state
  const [projects, setProjects] = useState([]);
  const data = useSelector((state) => state.login);
  console.log("project data: ", data);

  // server url from env file
  const SERVER_URL = process.env.REACT_APP_SERVER_URL; 

  const token = sessionStorage.getItem("token");
  // console.log("Token from super admin: ", token);

  const getProjects = async () => {
    // get users list from users table
    const projectsList = await axios.get(
      `${SERVER_URL}/special-user/all-projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("projects obj in projectlist: ", projects);
    // console.log("payload projects data: ", projectsList.data.projects);
    console.log("projectLIst: ", projectsList);
    setProjects(projectsList.data.projects);
  };

  // useEffect get all data from projects TABLE
  useEffect(() => {
    // console.log("get projects called!");
    getProjects();
  }, []);

  return (
    <>
      {projects > 0 && (
        <div>
          <h2>Users List</h2>
          <table class="table table-striped border ms-4 me-4">
            <thead>
              <tr>
                <th scope="col">projectId</th>
                <th scope="col">projectName</th>
                <th scope="col">clientName</th>
                <th scope="col">clientAccountManager</th>
                <th scope="col">projectStatus</th>
                <th scope="col">projectStartDate</th>
                <th scope="col">projectEndDate</th>
                <th scope="col">projectFitnessIndicator</th>
                <th scope="col">projectDomain</th>
                <th scope="col">projectType</th>
                <th scope="col">gdoId</th>
                <th scope="col">projectManager</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project, index) => {
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
