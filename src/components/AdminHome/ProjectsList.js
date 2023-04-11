import React from "react";
import deleteButton from "../images/delete.svg";
import detailsButton from "../images/details.svg";
import { useNavigate } from "react-router-dom";

function ProjectsList({ projects, deleteAProject }) {
  // initialize navigate
  const navigate = useNavigate();
  return (
    <>
      <div className="project-list">
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
    </>
  );
}

export default ProjectsList;
