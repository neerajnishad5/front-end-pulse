import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import createButton from "../images/create.svg";
import { useSelector } from "react-redux";

export default function RaiseProjectUpdate({
  managerName,
  updateMsg,
  setManagerName,
  setUpdateMsg,
}) {
  const token = sessionStorage.getItem("token");
  const data = useSelector((state) => state.login);
  const projectManagerId = data.userObj.userId;

  console.log(projectManagerId);

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

    postUpdate.updateDate = new Date().toJSON().slice(0, 10);
    postUpdate.projectManager = projectManagerId;

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
      console.log("update pososos: ", res);

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
                  <label htmlFor="projectStatus">Project Status</label>

                  <input
                    name="projectStatus"
                    type="text"
                    id="projectStatus"
                    className="form-control"
                    {...register("projectStatus", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectStatus?.type === "required" && (
                    <span className="text-danger">
                      Project Status is required
                    </span>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="scheduleStatus">Schedule Status</label>

                  <select
                    {...register("scheduleStatus", { required: true })}
                    name="scheduleStatus"
                    id="scheduleStatus"
                    className="form-control"
                  >
                    <option disabled selected>
                      -- Select status --
                    </option>
                    <option value="g">Green</option>
                    <option value="a">Amber</option>
                    <option value="r">Red</option>
                  </select>

                  {errors.scheduleStatus?.type === "required" && (
                    <span className="text-danger">
                      Schedule Status is required
                    </span>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="resourcingStatus">Resourcing Status</label>

                  <select
                    {...register("resourcingStatus", { required: true })}
                    name="resourcingStatus"
                    id="resourcingStatus"
                    className="form-control"
                  >
                    <option disabled selected>
                      -- Select status --
                    </option>
                    <option value="g">Green</option>
                    <option value="a">Amber</option>
                    <option value="r">Red</option>
                  </select>

                  {errors.resourcingStatus?.type === "required" && (
                    <span className="text-danger">
                      Resourcing Status is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="qualityStatus">Quality Status</label>

                  <select
                    {...register("qualityStatus", { required: true })}
                    name="qualityStatus"
                    id="qualityStatus"
                    className="form-control"
                  >
                    <option disabled selected>
                      -- Select status --
                    </option>
                    <option value="g">Green</option>
                    <option value="a">Amber</option>
                    <option value="r">Red</option>
                  </select>

                  {errors.qualityStatus?.type === "required" && (
                    <span className="text-danger">
                      Schedule Status is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="waitingForClient">Waiting For Client</label>

                  <select
                    {...register("waitingForClient", { required: true })}
                    name="waitingForClient"
                    id="waitingForClient"
                    className="form-control"
                  >
                    <option disabled selected>
                      -- Select status --
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>

                  {errors.scheduleStatus?.type === "required" && (
                    <span className="text-danger">
                      Schedule Status is required
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
