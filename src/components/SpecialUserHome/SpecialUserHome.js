import axios from "axios";
import { useState, useEffect } from "react";
import "./SpecialUserHome.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateAProject from "./CreateAProject";
import deleteButton from "../images/delete.svg";
import detailsButton from "../images/details.svg";

export default function SpecialUser() {
  // projects state
  const [projects, setProjects] = useState([]);
  const [resourceRequests, setResourceRequests] = useState([]);
  const data = useSelector((state) => state.login);
  // console.log("project data: ", data);

  const token = sessionStorage.getItem("token");
  // console.log("Token from super admin: ", token);

  // special user ID
  const specialUserId = data.userObj.userId;

  const getProjects = async () => {
    // get users list from users table
    const projectsList = await axios.get(
      `http://localhost:5000/special-user/all-projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(projectsList.data.projects);
    setProjects(projectsList.data.projects);
  };

  // initializing useNavigate
  const navigate = useNavigate();

  const getResourceRequest = async () => {
    try {
      // user from register

      let res = await axios.get(
        "http://localhost:5000/special-user/all-resource-requests",
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      // console.log("res from get resource req: ", res);
      setResourceRequests(res.data.payload);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const deleteAProject = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/special-user/delete-project/project/${id}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      getProjects();

      // console.log("delete res from special user: ", res);
    } catch (error) {
      console.log("delete a proj", error);
    }
  };

  const deleteResourceRequest = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/special-user/delete-resource-request/${id}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      getResourceRequest();
    } catch (error) {
      console.log("Error in resource req: ", error);
    }
  };

  // useEffect get all data from projects TABLE
  useEffect(() => {
    // console.log("get projects called!");
    getProjects();
    getResourceRequest();
    deleteAProject();
  }, []);

  return (
    <div>
      <h2 className="bg-success container w-30 d-flex justify-content-center mx-auto text-white p-3 rounded">
        Welcome Special User(Admin) {data.userObj.name}
      </h2>
      <div className="row  justify-content-center mx-auto">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <CreateAProject getProjects={getProjects} />
        </div>
      </div>

      <div>
        {resourceRequests?.length > 0 && (
          <div className="container ">
            <h2>All resource request list</h2>
            <table className="table table-striped border">
              <thead className=" text-dark ">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">GDO ID</th>
                  <th scope="col">Project ID</th>
                  <th scope="col">Resource Description</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              <tbody>
                {resourceRequests.map((resource, index) => {
                  return (
                    <tr key={index}>
                      <td>{resource.id}</td>
                      <td>{resource.gdoId}</td>
                      <td>{resource.projectId}</td>
                      <td>{resource.requestdescription}</td>
                      <td>
                        <button
                          onClick={() => deleteResourceRequest(resource.id)}
                          className="btn btn-danger"
                        >
                          <img
                            width="25px"
                            src={deleteButton}
                            alt=""
                            srcset=""
                          />
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

      <div className="project-list ">
        {projects?.length > 0 && (
          <div className="container table-responsive">
            <h2>Projects List</h2>
            <table className="table table-striped border">
              <thead>
                <tr>
                  <th scope="col">Project ID</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">client Name</th>
                  <th scope="col">Client Account Manager</th>
                  <th scope="col">Project Status</th>
                  <th scope="col">Project Start Date</th>
                  <th scope="col">Project End Date</th>
                  <th scope="col">Project Fitness Indicator</th>
                  <th scope="col">Project Domain</th>
                  <th scope="col">Project Type</th>
                  <th scope="col">GDO ID</th>
                  <th scope="col">Project Manager</th>
                  <th scope="col">Delete</th>
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
                          className="btn btn-danger"
                          onClick={() => deleteAProject(project.projectId)}
                        >
                          <img width="25px" src={deleteButton} alt="" />
                        </button>
                      </td>

                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            navigate(`/project-details/${project.projectId}`)
                          }
                        >
                          <img width="25px" src={detailsButton} alt="" />
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
