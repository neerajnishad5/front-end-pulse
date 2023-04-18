import Card from "react-bootstrap/Card";
import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
// useForm
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import assignButton from "../images/assign.svg";

export default function AssignProject({ getProjects, projects }) {
  const [showModal, setShowModal] = useState(false);

  // for opening and closing on model
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const token = sessionStorage.getItem("token");

  // server url from env file
  const SERVER_URL = process.env.REACT_APP_SERVER_URL; 

  const editModal = () => {
    openModal();
  };

  // console.log(projects[1].projectId);

  // react hook form
  const {
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  // save user
  const saveModal = async () => {
    closeModal();

    const employeeToAssign = getValues();

    console.log("emp to assign", employeeToAssign);

    // make assign request here
    let res = await axios.post(
      `${SERVER_URL}/gdo/assign-project`,
      employeeToAssign,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    // to render on screen once again
    getProjects();

    // logging the object
    console.log("res in gdo home", res);

    // setting the data to screen
    // console.log("res data paylaod: ", res.data.payload);
    console.log("res data: ", res.data);
    reset();
  };

  return (
    < >
      <Card className="shadow p-3 mb-5 color-this rounded">
        <Card.Body>
          <Card.Title>Assign project to employee</Card.Title>

          <button onClick={editModal} className="btn btn-success">
            <img src={assignButton} width="25px" alt="" />
          </button>
        </Card.Body>
      </Card>

      <div>
        <Modal show={showModal} onHide={closeModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Assign project to employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="p-3 bg-white text-dark rounded">
              <div className="col">
                <label htmlFor="id">Employee ID</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("id", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.id?.type === "required" && (
                  <span className="text-danger">ID is required</span>
                )}
              </div>

              <div className="col mt-2">
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

              <div className="col mt-2">
                <label htmlFor="resourceName">Resource Name</label>
                <input
                  type="text"
                  name="resourceName"
                  className="form-control"
                  {...register("resourceName", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.resourceName?.type === "required" && (
                  <span className="text-danger">resource Name is required</span>
                )}
              </div>

              <div className="col mt-2">
                <label htmlFor="role">Role</label>

                <select
                  {...register("roleInProject", { required: true })}
                  name="roleInProject"
                  id="roleInProject"
                  className="form-control"
                >
                  <option selected disabled>
                    -- Select status --
                  </option>
                  <option value="QA">QA</option>
                  <option value="DEV">DEV</option>
                  <option value="PRODUCT">PRODUCT</option>
                  <option value="MANAGEMENT">MANAGEMENT</option>
                  <option value="DEVOPS">DEVOPS</option>
                </select>

                {/* errors will return when field validation fails  */}
                {errors.roleInProject?.type === "required" && (
                  <span className="text-danger">Role is required</span>
                )}
              </div>

              <div className="col mt-2">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("startDate", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.startDate?.type === "required" && (
                  <span className="text-danger">Start Date is required</span>
                )}
              </div>

              <div className="col mt-2">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("endDate", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.endDate && (
                  <span className="text-danger">endDate is required</span>
                )}
              </div>

              <div className="col mt-2">
                <label htmlFor="status">Status</label>

                <select
                  {...register("status", { required: true })}
                  name="status"
                  id="status"
                  className="form-control"
                >
                  <option selected disabled>
                    -- Status --
                  </option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>

                {/* errors will return when field validation fails  */}
                {errors.status?.type === "required" && (
                  <span className="text-danger">Status is required</span>
                )}
              </div>

              <div className="col mt-2">
                <label htmlFor="billingStatus">Billing Status</label>

                <select
                  {...register("billingStatus", { required: true })}
                  name="billingStatus"
                  id="billingStatus"
                  className="form-control"
                >
                  <option selected disabled>
                    -- Select status --
                  </option>
                  <option value="Billed">Billed</option>
                  <option value="Buffer">Buffer</option>
                </select>

                {/* errors will return when field validation fails  */}
                {errors.billingStatus?.type === "required" && (
                  <span className="text-danger">
                    Billing Status is required
                  </span>
                )}
              </div>

              <div className="col mt-2">
                <label htmlFor="exposedToCustomer">Exposed To Customer</label>

                <select
                  {...register("exposedToCustomer", { required: true })}
                  name="exposedToCustomer"
                  id="exposedToCustomer"
                  className="form-control"
                >
                  <option disabled selected>
                    -- Select status --
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                {/* errors will return when field validation fails  */}
                {errors.exposedToCustomer?.type === "required" && (
                  <span className="text-danger">
                    Exposed To Customer is required
                  </span>
                )}
              </div>

              <div className="col mt-2">
                <label htmlFor="allocationType">Allocation Type</label>

                <select
                  {...register("allocationType", { required: true })}
                  name="allocationType"
                  id="allocationType"
                  className="form-control"
                >
                  <option disabled selected>
                    -- Type --
                  </option>
                  <option value="permanent">Permanent</option>
                  <option value="temporary">Temporary</option>
                </select>

                {/* errors will return when field validation fails  */}
                {errors.allocationType?.type === "required" && (
                  <span className="text-danger">
                    Allocation Type is required
                  </span>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" onClick={saveModal}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </ >
  );
}
