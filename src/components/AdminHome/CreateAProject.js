import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import "./AdminHome.css";
import createButton from "../images/create.svg";

// useForm
import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";

export default function CreateAProject({ getProjects }) {
  const [showModal, setShowModal] = useState(false);
  // for opening and closing on model
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // getting token from session storage
  const token = sessionStorage.getItem("token");

  // server url from env file
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const saveProject = async () => {
    closeModal();

    // calling getValues from react-hook-form
    let projectInput = getValues();

    console.log("Project input: ", projectInput);

    try {
      let res = await axios.post(
        `${SERVER_URL}/admin/create-project`,
        projectInput,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("project res", res);
      getProjects();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    document.title = "Create Project | PULSE";
  }, []);

  return (
    <div className="card-color">
      <div>
        <Card className="shadow p-3 mb-5 color-this mt-3 container rounded">
          <Card.Body>
            <Card.Title>Create a project</Card.Title>
            <Card.Text>Create a new project to assign to the team</Card.Text>
            <button onClick={openModal} className="btn btn-success">
              <img src={createButton} width="25px" alt="" />
            </button>
          </Card.Body>
        </Card>
      </div>

      <div className="create-project">
        <Modal show={showModal} onHide={closeModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Create a project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* use edit form */}
            <form className="p-3 bg-light text-dark rounded">
              {/* register your input into the hook by invoking the "register" function */}

              <div className="col">
                <label htmlFor="projectId">Project ID</label>
                <input
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
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("projectName", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.projectName?.type === "required" && (
                  <span className="text-danger">Project Name is required</span>
                )}
              </div>

              <div className="col">
                <label htmlFor="clientName">Client Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("clientName", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.clientName?.type === "required" && (
                  <span className="text-danger">Client Name is required</span>
                )}
              </div>

              <div className="col">
                <label htmlFor="clientAccountManager">
                  Client Account Manager Name
                </label>
                <input
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

              <div className="  col  ">
                <label htmlFor="projectStartDate">Project Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("projectStartDate", { required: true })}
                />

                {/* errors will return when field validation fails  */}
                {errors.projectStartDate?.type === "required" && (
                  <span className="text-danger">
                    Project Start Date is required
                  </span>
                )}
              </div>

              <div className="  col  ">
                <label htmlFor="projectEndDate">Project End Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("projectEndDate")}
                />

                {/* errors will return when field validation fails  */}
                {errors.projectEndDate?.type === "required" && (
                  <span className="text-danger">
                    Project End Date is required
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
                  <option disabled selected>
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
                <label htmlFor="projectDomain">Project Domain</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("projectDomain", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.projectDomain?.type === "required" && (
                  <span className="text-danger">
                    Project Domain is required
                  </span>
                )}
              </div>

              <div className="col">
                <label htmlFor="projectType">Project Type</label>

                <select
                  {...register("projectType", { required: true })}
                  name="projectType"
                  id="projectType"
                  className="form-control"
                >
                  <option value="" selected disabled>
                    -- Select type --
                  </option>
                  <option value="Development">Development</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Security">Security</option>
                  <option value="Mobility">Mobility</option>
                  <option value="Storage">Storage</option>
                  <option value="Test Automation">Test Automation</option>
                  <option value="Sustenance Engineering">
                    Sustenance Engineering
                  </option>
                  <option value="Performance Testing">
                    Performance Testing
                  </option>
                </select>

                {/* errors will return when field validation fails  */}
                {errors.projectType?.type === "required" && (
                  <span className="text-danger">Project Type is required</span>
                )}
              </div>

              <div className="col">
                <label htmlFor="gdoId">GDO ID</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("gdoId", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.gdoId?.type === "required" && (
                  <span className="text-danger">GDO ID is required</span>
                )}
              </div>

              <div className="col">
                <label htmlFor="projectManager">Project Manager ID</label>
                <input
                  name="projectManager"
                  type="number"
                  className="form-control"
                  {...register("projectManager", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.projectManager?.type === "required" && (
                  <span className="text-danger">
                    Project Manager ID is required
                  </span>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" onClick={saveProject}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
