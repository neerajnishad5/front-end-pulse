import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import createButton from "../images/create.svg";

export default function RaiseProjectUpdate({
  managerName,
  updateMsg,
  setManagerName,
  setUpdateMsg,
}) {
  const token = sessionStorage.getItem("token");

  // console.log("token from projectmanager", token);

  // modal for raising project update
  const [showModal, setShowModal] = useState(false);

  // for opening and closing on model
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const editUser = () => {
    openModal();
  };

  // save project update
  const saveProjectUpdate = async () => {
    closeModal();

    // calling getValues from react-hook-form
    let postUpdate = getValues();

    console.log("Modified user: ", postUpdate);

    const projectId = postUpdate.projectId;

    // make http put req

    try {
      let res = await axios.post(
        `http://localhost:5000/project-manager/raise-project-update/project/${projectId}`,
        postUpdate,
        {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        }
      );
      // logging the object
      console.log(res);

      // setting the data to screen
      console.log("res data paylaod: ", res.data.payload);
      console.log("res data: ", res.data);
      setTimeout(() => {
        setUpdateMsg("Project update raised!");
      }, 3000);
    } catch (error) {
      console.log("error from raise update: ", error);
      setManagerName(error.message);
    }
  };

  return (
    <div>
      <Card className="shadow p-3 mb-5 color-this rounded">
        <Card.Body>
          <Card.Title>Raise project update</Card.Title>
          <Card.Text>
            Raise a project update regarding a particular project
          </Card.Text>
          <button onClick={editUser} className="btn btn-success">
            <img width="25px" src={createButton} alt="" />
          </button>
        </Card.Body>
      </Card>

      <div className="modal-div">
        <div className="raise-project-update-modal">
          <Modal show={showModal} onHide={closeModal} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Raise project update</Modal.Title>
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
                  <label htmlFor="updateDate">Update date</label>
                  <input
                    name="updateDate"
                    type="date"
                    className="form-control"
                    {...register("updateDate", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.updateDate?.type === "required" && (
                    <span className="text-danger">Update Date is required</span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="clientAccountManager">
                    Client Account Manager
                  </label>
                  <input
                    name="clientAccountManager"
                    type="text"
                    className="form-control"
                    {...register("clientAccountManager", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.clientAccountManager?.type === "required" && (
                    <span className="text-danger">
                      Client Account Manager is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectStatus">Project Status</label>

                  <select
                    {...register("projectStatus", { required: true })}
                    name="projectStatus"
                    id="projectStatus"
                    className="form-control"
                  >
                    <option value="" selected disabled>
                      -- Select status --
                    </option>
                    <option value="Sales">Sales</option>
                    <option value="Pre-Sales">Pre-Sales</option>
                    <option value="Client sign off">Client sign off</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Paused">Paused</option>
                    <option value="Deferred">Deferred</option>
                  </select>

                  {/* errors will return when field validation fails  */}
                  {errors.projectStatus?.type === "required" && (
                    <span className="text-danger">
                      Project Status is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectFitnessIndicator">
                    Project Fitness Indicator
                  </label>

                  <select
                    {...register("projectFitnessIndicator", { required: true })}
                    name="projectFitnessIndicator"
                    id="projectFitnessIndicator"
                    className="form-control"
                  >
                    <option value="" selected disabled>
                      -- Select fitness --
                    </option>
                    <option value="g">Green</option>
                    <option value="a">Amber</option>
                    <option value="r">Red</option>
                  </select>
                  {/* errors will return when field validation fails  */}
                  {errors.projectFitnessIndicator?.type === "required" && (
                    <span className="text-danger">
                      Project Fitness Indicator is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectManager">Project Manager ID</label>
                  <input
                    type="number"
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
                onClick={saveProjectUpdate}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
