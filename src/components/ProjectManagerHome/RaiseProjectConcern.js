import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import createButton from "../images/create.svg";

export default function RaiseProjectConcern() {
  const [showModal2, setShowModal2] = useState(false);
  // for opening and closing on model
  const openModal2 = () => setShowModal2(true);
  const closeModal2 = () => setShowModal2(false);

  const token = sessionStorage.getItem("token");

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const concernModalEdit = () => {
    openModal2();
  };

  // post project concern
  const postProjectConcern = async () => {
    closeModal2();

    const postConcern = getValues();

    console.log("log from project concern: ", postConcern);

    const projectId = postConcern.projectId;

    try {
      let res = await axios.post(
        `http://localhost:5000/project-manager/raise-project-concern/project/${projectId}`,
        postConcern,
        {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        }
      );
      // logging the object
      console.log("res raised: ", res);
    } catch (error) {
      console.log("Error in concern: ", error);
    }
  };
  return (
    <div>
      <div>
        <Card className="shadow p-3 mb-5 color-this rounded">
          <Card.Body>
            <Card.Title>Raise project concern</Card.Title>
            <Card.Text>
              Raise a project concern regarding a particular project
            </Card.Text>
            <button onClick={concernModalEdit} className="btn btn-success">
              <img width="25px" src={createButton} alt="" />
            </button>
          </Card.Body>
        </Card>
      </div>

      <div className="raise-concern-modal">
        <Modal show={showModal2} onHide={closeModal2} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Raise project concern</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="p-3 bg-white text-dark rounded">
              <div className="col">
                <label htmlFor="projectId">Project ID</label>
                <input
                  name="projectId"
                  type="number"
                  className="form-control"
                  {...register("projectId", {
                    required: true,
                  })}
                />
                {/* errors will return when field validation fails  */}
                {errors.projectId?.type === "required" && (
                  <span className="text-danger">Project ID is required</span>
                )}
              </div>

              <div className="col">
                <label className="mt-2" htmlFor="concernDescription">
                  Concern description
                </label>
                <input
                  name="concernDescription"
                  type="text"
                  className="form-control"
                  {...register("concernDescription", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.concernDescription?.type === "required" && (
                  <span className="text-danger">
                    Concern Description is required
                  </span>
                )}
              </div>

              <div className="col">
                <label className="mt-2" htmlFor="raisedBy">
                  Raised by
                </label>
                <input
                  name="raisedBy"
                  type="text"
                  className="form-control"
                  {...register("raisedBy", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.raisedBy?.type === "required" && (
                  <span className="text-danger">Raised by is required</span>
                )}
              </div>

              <div className="col">
                <label className="mt-2" htmlFor="raisedOn">
                  Concern raise date
                </label>
                <input
                  name="raisedOn"
                  type="date"
                  className="form-control"
                  {...register("raisedOn", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.raisedOn?.type === "required" && (
                  <span className="text-danger">Raised on is required</span>
                )}
              </div>

              <div className="col">
                <label className="mt-2" htmlFor="severityOfConcern">
                  Severity of concern
                </label>

                <select
                  {...register("severityOfConcern", { required: true })}
                  name="severityOfConcern"
                  id="severityOfConcern"
                  className="form-control"
                >
                  <option value="" selected disabled>
                    -- Severity level --
                  </option>
                  <option value="high">High</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>

                {/* errors will return when field validation fails  */}
                {errors.severityOfConcern?.type === "required" && (
                  <span className="text-danger">
                    Severity of concern is required
                  </span>
                )}
              </div>

              <div className="col">
                <label className="mt-2" htmlFor="raisedInternally">
                  Raised internally
                </label>

                <select
                  {...register("raisedInternally", { required: true })}
                  name="raisedInternally"
                  id="raisedInternally"
                  className="form-control"
                >
                  <option value="" selected disabled>
                    -- Select status --
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {/* errors will return when field validation fails  */}
                {errors.raisedInternally?.type === "required" && (
                  <span className="text-danger">
                    Raised internally is required
                  </span>
                )}
              </div>

              <div className="col">
                <label className="mt-2" htmlFor="status">
                  Status
                </label>

                <select
                  {...register("status", { required: true })}
                  name="status"
                  id="status"
                  className="form-control"
                >
                  <option value="" selected disabled>
                    -- Select status --
                  </option>
                  <option value="Raised">Raised</option>
                  <option value="Mitigated">Mitigated</option>
                  <option value="Remediation Suggested">
                    Remediation Suggested
                  </option>
                </select>

                {/* errors will return when field validation fails  */}
                {errors.status?.type === "required" && (
                  <span className="text-danger">Status is required</span>
                )}
              </div>

              <div className="col">
                <label className="mt-2" htmlFor="concernMitigationDate">
                  Concern Mitigation Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  {...register("concernMitigationDate", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.concernMitigationDate?.type === "required" && (
                  <span className="text-danger">
                    Concern Mitigation date is required
                  </span>
                )}
              </div>

              <div className="col">
                <label className="mt-2" htmlFor="projectManager">
                  Project Manager ID
                </label>
                <input
                  type="number"
                  name="projectManager"
                  className="form-control"
                  {...register("projectManager", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.projectManager?.type === "required" && (
                  <span className="text-danger">
                    Project Manager is required
                  </span>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              type="submit"
              onClick={postProjectConcern}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
