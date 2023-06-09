import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import axios from "axios";
import "./ProjectDetails.css";
import Indicator from "./Indicator";
import deleteButton from "../images/delete.svg";
import green from "../images/green.svg";
import amber from "../images/amber.svg";
import red from "../images/red.svg";

export default function ProjectDetails() {
  // gettting user from store
  const data = useSelector((state) => state.login);

  // project ID
  const { id } = useParams();

  // console.log("use params id", id);
  const projectId = id;

  // state to save detailed project view
  const [projectTeamComposition, setProjectTeamComposition] = useState([]);
  const [projectConcerns, setProjectConcerns] = useState([]);
  const [projects, setProjects] = useState([]);
  const [detailedView, setDetailedView] = useState({});
  const [projectUpdates, setProjectUpdates] = useState([]);

  // server url from env file
  const SERVER_URL = process.env.REACT_APP_SERVER_URL; 

  // const userId = data.userObj.userId;
  const role = data.userObj.role;

  // console.log("detailed view obj", data);
  const token = sessionStorage.getItem("token");

  const getProjectDetails = async (projectId) => {
    try {
      if (role === "projectManager") {
        const projectDetails = await axios.get(
          `${SERVER_URL}/project-manager/detailed-project-view/project/${projectId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        setDetailedView(projectDetails.data.payload);
        setProjectTeamComposition(
          projectDetails?.data.payload.projectTeamCompositions
        );

        setProjectUpdates(projectDetails.data.payload.projectUpdates);
        setProjectConcerns(projectDetails.data.payload.projectConcerns);
        console.log("concerns: ", projectDetails.data.payload.projectConcerns);

        setProjects(projectDetails?.data.singleProject);

        // set project details
      } else if (role === "gdo") {
        const projectDetails = await axios.get(
          `${SERVER_URL}/gdo/gdoId/5/detailed-project-view/project/${projectId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        // console.log("Projct deails: ", projectDetails);

        setProjectTeamComposition(
          projectDetails.data?.payload.projectTeamCompositions
        );
        setProjectUpdates(projectDetails.data?.payload.projectUpdates);
        setProjectConcerns(projectDetails.data?.payload.projectConcerns);
        setProjects(projectDetails.data?.singleProject);

        // console.log("Set projects:  ", projectDetails?.data.singleProject);
      } else if (role === "admin") {
        const projectDetails = await axios.get(
          `${SERVER_URL}/admin/detailed-view/project/${projectId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        // console.log("special user project details", projectDetails);
        setProjectTeamComposition(projectDetails.data.payload.projectTeamCompositions);
        setProjectUpdates(projectDetails.data.payload.projectUpdates);
        setProjectConcerns(projectDetails.data.payload.projectConcerns);
        setProjects(projectDetails?.data.singleProject);

        // console.log("Length: ", projectDetails.data.singleProject.length);
      }
    } catch (error) {
      console.log("error in project details: ", error);
    }
  };


  // function to delete employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/gdo/delete-member/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      getProjectDetails(projectId);
    } catch (error) {
      console.log("Error in deleting: ", error);
    }
  };


  // function to delete project concern
  const deleteProjectConcern = async (id) => {
    try {
      if (role === "projectManager") {
        await axios.delete(
          `${SERVER_URL}/project-manager/delete-project-concern/${id}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        // reloading the table after deleting
        getProjectDetails(projectId);
      } else if (role === "gdo") {
        await axios.delete(
          `${SERVER_URL}/${role}/delete-project-concern/2`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        // reloading the table after deleting
        getProjectDetails(projectId);
      }
    } catch (error) {
      console.log("Error in delete concern: ", error);
    }
  };

  // color indicator for different statuses in project updates
  const colorIndicator = (color) => {
    if (color === "g") {
      return <img width="25px" src={green} />;
    } else if (color === "r") {
      return <img width="25px" src={red} />;
    } else if (color === "a") {
      return <img width="25px" src={amber} />;
    } else {
      return <p>null</p>;
    }
  };

  // useEffect hook to load project details once everything is loaded
  useEffect(() => {
    getProjectDetails(projectId);
  }, []);

  return (
    <div className="container">
      <h2 className="bg-success text-white p-3 mt-3">Detailed Project View</h2>

      <div className="row mb-3">
        <Indicator
          projects={projects}
          projectConcerns={projectConcerns}
          projectTeamComposition={projectTeamComposition}
          projectUpdates={projectUpdates}
        />
      </div>

      <div>
        <div>
          {projects?.length > 0 && (
            <div>
              <h2>Project Details</h2>
              <table className="table table-hover table-striped border ms-4 me-4 ">
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2>Project Updates</h2>
        {projectUpdates?.length === 0 ? (
          <div className="bg-dark p-2">
            <h3 className="text-white">No updates raised!</h3>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped border">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Project Manager</th>
                  <th scope="col">Update Date</th>
                  <th scope="col">Project Status</th>
                  <th scope="col">Schedule Status</th>
                  <th scope="col">Resourcing Status</th>
                  <th scope="col">Quality Status</th>
                  <th scope="col">Waiting for Client</th>
                </tr>
              </thead>

              <tbody>
                {projectUpdates?.map((update, index) => {
                  return (
                    <tr key={index}>
                      <td>{update.id}</td>
                      <td>{update.projectManager}</td>
                      <td>{update.updateDate}</td>
                      <td>{update.projectStatus}</td>
                      <td>{colorIndicator(update.scheduleStatus)}</td>
                      <td>{colorIndicator(update.resourcingStatus)}</td>
                      <td>{colorIndicator(update.qualityStatus)}</td>
                      <td>{update.waitingForClient ? "Yes" : "No"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="project-team-composition mt-2">
        <div>
          <h2>Project Team Composition</h2>
          {projectTeamComposition?.length === 0 ? (
            <div className="bg-dark p-2">
              <h3 className="text-white">No team members exist!</h3>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped border  ">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Project ID</th>
                    <th scope="col">Role in project</th>
                    <th scope="col">Resource Name</th>
                    <th scope="col">Billing Status</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {projectTeamComposition?.map((member, index) => {
                    return (
                      <tr key={index}>
                        <td>{member.id}</td>
                        <td>{member.projectId}</td>
                        <td>{member.roleInProject}</td>
                        <td>{member.resourceName}</td>
                        <td>{member.billingStatus}</td>
                        <td>{member.startDate}</td>
                        <td>{member.endDate}</td>
                        <td>
                          <button
                            onClick={() => deleteEmployee(member.id)}
                            className="btn btn-danger"
                          >
                            <img width="23px" src={deleteButton} alt="" />
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

        <div className="project-concerns mt-2">
          <h2>Project Concerns</h2>
          {projectConcerns?.length === 0 ? (
            <div className="bg-dark p-2">
              <h3 className="text-white">No concerns raised!</h3>
            </div>
          ) : (
            <div className="container table-responsive">
              <table className="table table-hover table-striped border ">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Project ID</th>
                    <th scope="col">Concern description</th>
                    <th scope="col">Raised by</th>
                    <th scope="col">Raised on</th>
                    <th scope="col">Severity of concern</th>
                    <th scope="col">Raised internally</th>
                    <th scope="col">Status</th>
                    <th scope="col">Concern mitigation date </th>
                    <th scope="col">Project Manager</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {projectConcerns?.map((concern, index) => {
                    return (
                      <tr key={index}>
                        <td>{concern.id}</td>
                        <td>{concern.projectId}</td>
                        <td>{concern.concernDescription}</td>
                        <td>{concern.raisedBy}</td>
                        <td>{concern.raisedOn}</td>
                        <td>{concern.severityOfConcern}</td>
                        <td>{concern.raisedInternally ? "Yes" : "No"}</td>
                        <td>{concern.status}</td>
                        <td>{concern.concernMitigationDate}</td>
                        <td>{concern.projectManager}</td>
                        <td>
                          <button
                            onClick={() => deleteProjectConcern(concern.id)}
                            className="btn btn-danger"
                          >
                            <img width="23px" src={deleteButton} />
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
    </div>
  );
}
