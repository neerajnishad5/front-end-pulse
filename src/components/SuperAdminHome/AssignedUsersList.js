import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import assignButton from "../images/assignRole.svg"; 

// export function
export default function AssignedUsersList(props) {
  const [users, setUsers] = useState([]);
  const data = useSelector((state) => state.login);
  const [name, setName] = useState("");

  const [showModal, setShowModal] = useState(false);
  // for opening and closing on model
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const token = sessionStorage.getItem("token");

  // server url from env file
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  // get all users
  const getUsers = async () => {
    // get users list from users table
    const userList = await axios.get(`${SERVER_URL}/super-admin/all-users`, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });

    setUsers(userList.data.payload);
    setName(data.userObj.name);
  };

  const saveModal = async () => {
    closeModal();

    // calling getValues from react-hook-form
    let modifiedUser = getValues();

    // make http put req

    let res = await axios.put(
      `${SERVER_URL}/super-admin/assign-role`,
      modifiedUser,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );

    // getting users when updated role
    getUsers();

    // resetting array to reload as role is updated
    setUsers(res.data.payload);
  };

  const editModal = (index) => {
    openModal();

    setValue("userId", users[index].userId);
    // setValue("role", array[index].role);
  };

  // filtering data based on input
  const filterData = users.filter((user) => {
    if (props.inputText.length === 0) {
      return user;
    }
    // return item which contains input
    else {
      if (user.name.toLowerCase().includes(props.inputText)) {
        return user;
      }
    }
  });

  useEffect(() => {
    getUsers();
    document.title = "Super Admin | HOME";
  }, []);

  return (
    <>
      <div className="table-responsive">
        {filterData?.length > 0 && (
          <div className="container">
            <h2>Welcome Super Admin {name}</h2>
            <h2
              style={{ width: "25%" }}
              className="bg-success d-flex justify-content-center mx-auto text-white p-2 mb-3 mt-3"
            >
              Users List
            </h2>

            <div className="table-responsive container">
              <table className="table table-hover table-striped border ms-4 me-4 shadow p-3 mb-5 rounded">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Assign role</th>
                  </tr>
                </thead>

                <tbody>
                  {filterData.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.userId}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            onClick={() => editModal(index)}
                            className="btn btn-success"
                          >
                            <img width="20px" src={assignButton} alt="" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div>
        <Modal show={showModal} onHide={closeModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
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
                    Select Role
                  </option>
                  <option value="gdo">GDO Head</option>
                  <option value="projectManager">Project Manager</option>
                  <option value="admin">Admin</option>
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
    </>
  );
}
