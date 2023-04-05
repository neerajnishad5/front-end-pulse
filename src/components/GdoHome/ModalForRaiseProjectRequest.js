// import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState, useEffect } from "react";

// useForm
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ModalForRaiseProjectRequest() {
  const data = useSelector((state) => state.login);
  console.log("data from modal fro raise: ", data);

  // token

  const token = sessionStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  // for opening and closing on model
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [array, setArray] = useState([]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const editUser = (index) => {
    openModal();

    // set already put data to input fields, this uses name property of react-hook-form

    // setValue("userId", array[index].userId);
    // setValue("username", array[index].username);
    // setValue("email", array[index].email);
    // setValue("userRole", array[index].userRole);

    // set values to input field
  };

  const saveModal = async () => {
    closeModal();

    // calling getValues from react-hook-form
    let projectInput = getValues();

    // make http put req

    let res = await axios.post(
      `http://localhost:5000/special-user/create-project`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // logging the object
    // console.log(res);

    // setting the data to screen
    // console.log("res data paylaod: ", res.data.payload);
    // console.log("res data: ", res.data);

    // // getting user from database to avoid refresh and gone thing
    // const finalUser = getUserById(modifiedUser.id);

    // setModifyToScreen(finalUser);
  };

  return (
    <div>
      <div>
        <Modal show={showModal} onHide={closeModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* use edit form */}
            <form className="p-3 bg-dark text-white rounded">
              {/* register your input into the hook by invoking the "register" function */}

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
                {errors.id && (
                  <span className="text-danger">id is required</span>
                )}
              </div>

              <div className="col">
                <label htmlFor="projectId">projectId</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("projectId", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.projectId && (
                  <span className="text-danger">projectId is required</span>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={saveModal}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
