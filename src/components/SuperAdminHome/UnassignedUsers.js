import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function UnassignedUsers() {
  const [array, setArray] = useState([]);
  const data = useSelector((state) => state.login);
  const [name, setName] = useState("");

  console.log("data state from super admin: ", data);

  const [showModal, setShowModal] = useState(false);
  // for opening and closing on model
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  // get all users
  const getUsers = async () => {
    // get users list from users table
    const userList = await axios.get(
      "http://localhost:5000/super-admin/unassigned-users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("payload data: ", userList.data.payload);
    setArray(userList.data.payload);
    setUsers(userList.data.payload);
    setName(data.userObj.name);
  };
  const editModal = (index) => {
    openModal();

    setValue("userId", users[index].userId);
  };

  const saveModal = async () => {
    closeModal();

    // calling getValues from react-hook-form
    let modifiedUser = getValues();

    console.log("modified user: ", modifiedUser);

    // make http put req

    let res = await axios.put(
      `http://localhost:5000/super-admin/assign-role`,
      modifiedUser,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    // getting users when updated role
    getUsers();

    // resetting array to reload as role is updated
    setArray(res.data.payload);
  };

  const token = sessionStorage.getItem("token");
  console.log("Token from super admin: ", token);

  useEffect(() => {
    getUnassignedUsers();
  }, []);

  const getUnassignedUsers = async () => {
    try {
      const users = await axios.get(
        `http://localhost:5000/super-admin/unassigned-users`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log("unassinged Users:", users);
      setUsers(users.data.payload);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <div style={{ backgroundcolor: "#FCAB10" }} className="container">
        <table className="table table-hover table-striped border ms-4 me-4 shadow p-3 mb-5 bg-white rounded">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Assign role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.userId}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <button
                      onClick={() => editModal(index)}
                      className="btn btn-primary m-2"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <Modal show={showModal} onHide={closeModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Assign Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* use edit form */}
            <form className="p-3 bg-white text-dark rounded">
              {/* register your input into the hook by invoking the "register" function */}

              <div className="col">
                <label htmlFor="userId">User ID</label>
                <input
                  className="form-control"
                  {...register("userId", {
                    required: true,
                  })}
                  disabled={true}
                />
                {/* errors will return when field validation fails  */}
                {errors.userId && (
                  <span className="text-danger">ID is required</span>
                )}
              </div>

              <div className="col">
                <label className="mt-2" htmlFor="role">
                  Role
                </label>

                <select
                  {...register("role", { required: true })}
                  name="role"
                  id="role"
                  className="form-control"
                >
                  <option value="" disabled selected>
                    -- Select role --
                  </option>
                  <option value="gdo">GDO Head</option>
                  <option value="projectManager">Project Manager</option>
                  <option value="specialUser">Special User</option>
                  <option value="hr">HR Manager</option>
                  <option value="notAssigned">Null</option>
                </select>

                {/* errors will return when field validation fails  */}
                {errors.role && (
                  <span className="text-danger">Role is required</span>
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
