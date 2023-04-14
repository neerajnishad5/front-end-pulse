import Card from "react-bootstrap/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// useForm
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import createButton from "../images/create.svg";

export default function RaiseResourcingRequest({ show, setShow }) {
  const token = sessionStorage.getItem("token");

  const data = useSelector((state) => state.login);
  const gdoId = data.userObj.userId;

  // react hook form
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all"
  });

  // MODAL 2

  const [showModal2, setShowModal2] = useState(false);
  const openModal2 = () => setShowModal2(true);
  const closeModal2 = () => setShowModal2(false);

  const editModal = () => {
    openModal2();
  };

  const saveModal2 = async () => {
    const request = getValues();
    console.log("Request from child", request);
    closeModal2();
    try {
      let res = await axios.post(
        `http://localhost:5000/gdo/resource-request`,
        request,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error in request raise: ", error);
    }
  };

  return (
    < >
      <div>
        <Card className="shadow p-3 mb-5 color-this rounded">
          <Card.Body>
            <Card.Title>Raise resource request</Card.Title>

            <button onClick={editModal} className="btn btn-success">
              <img src={createButton} width="25px" alt="" />
            </button>
          </Card.Body>
        </Card>
      </div>

      <div>
        <Modal show={showModal2} onHide={closeModal2} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Raise project update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="p-3 bg-white text-dark rounded">
              {/* register your input into the hook by invoking the "register" function */}

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
                {errors.gdoId && (
                  <span className="text-danger">GDO ID is required</span>
                )}
              </div>

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
                {errors.projectId && (
                  <span className="text-danger">Project ID is required</span>
                )}
              </div>

              <div className="col">
                <label htmlFor="requestdescription">Request description</label>

                <textarea
                  name=""
                  id=""
                  cols="7"
                  className="form-control"
                  {...register("requestdescription", {
                    required: true,
                  })}
                ></textarea>

                {/* errors will return when field validation fails  */}
                {errors.requestdescription && (
                  <span className="text-danger">
                    Request description is required
                  </span>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={saveModal2}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </ >
  );
}
