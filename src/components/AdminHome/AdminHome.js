import axios from "axios";
import { useState, useEffect } from "react";
import "./AdminHome.css";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateAProject from "./CreateAProject";
// import deleteButton from "../images/delete.svg";
// import detailsButton from "../images/details.svg";
import ProjectsList from "./ProjectsList";
import ResourceRequestList from "./ResourceRequestList";

export default function AdminHome() {
  // projects state
  const [projects, setProjects] = useState([]);
  const [resourceRequests, setResourceRequests] = useState([]);
  const data = useSelector((state) => state.login);
  // console.log("project data: ", data);

  const token = sessionStorage.getItem("token");
  // console.log("Token from super admin: ", token);

  // special user ID
  const specialUserId = data.userObj.userId;

  // server url from env file
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const getProjects = async () => {
    // get users list from users table
    const projectsList = await axios.get(`${SERVER_URL}/admin/all-projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(projectsList.data.projects);
    setProjects(projectsList.data.projects);
  };

  // initializing useNavigate
  // const navigate = useNavigate();

  const getResourceRequest = async () => {
    try {
      // user from register

      let res = await axios.get("${SERVER_URL}/admin/all-resource-requests", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      // console.log("res from get resource req: ", res);
      setResourceRequests(res.data.payload);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const deleteAProject = async (id) => {
    try {
      const res = await axios.delete(
        `${SERVER_URL}/admin/delete-project/project/${id}`,
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
        `${SERVER_URL}/admin/delete-resource-request/${id}`,
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
    document.title = "Admin | HOME";
  }, []);

  return (
    <>
      <h2 className="bg-success container w-30 d-flex justify-content-center mx-auto text-white p-3 rounded">
        Welcome Admin {data.userObj.name}
      </h2>
      <div className="row  justify-content-center mx-auto">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <CreateAProject getProjects={getProjects} />
        </div>
        <div>
          <ProjectsList projects={projects} />
        </div>
        <div>
          <ResourceRequestList
            resourceRequests={resourceRequests}
            deleteResourceRequest={deleteResourceRequest}
          />
        </div>
      </div>
    </>
  );
}
