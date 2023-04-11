import React from "react";
import deleteButton from "../images/delete.svg";
import { useSelector } from "react-redux";

export default function ResourceRequestList({
  resourceRequests,
  deleteResourceRequest,
}) {
  return (
    <>
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
                          <img width="25px" src={deleteButton} />
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
