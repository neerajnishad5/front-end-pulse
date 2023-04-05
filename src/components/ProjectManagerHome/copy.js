import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ProjectManagerHome.css";

export default function ProjectManagerHome() {
  // get data from store
  const data = useSelector((state) => state.login);
  const [managerName, setManagerName] = useState("");

  console.log("data obj: ", data);
  const projectManagerId = data.userObj.userId;

  console.log(projectManagerId);

  const token = sessionStorage.getItem("token");

  // console.log("token from projectmanager", token);

  const [showModal, setShowModal] = useState(false);

  // for opening and closing on model
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // MODAL 2

  const [showModal2, setShowModal2] = useState(false);
  const openModal2 = () => setShowModal2(true);
  const closeModal2 = () => setShowModal2(false);

  const editUser2 = (index) => {
    openModal2();

    // set already put data to input fields, this uses name property of react-hook-form

    // setValue("userId", array[index].userId);
    // setValue("username", array[index].username);
    // setValue("email", array[index].email);
    // setValue("userRole", array[index].userRole);
  };

  const saveModal2 = async () => {
    closeModal2();

    // calling getValues from react-hook-form
    let raiseProjectConcern = getValues();

    try {
      // console.log("raise update details: ", raiseUpdateDetails);

      // make http post req
      let res = await axios.post(
        `localhost:5000/project-manager/raise-project-concern/project/${projectManagerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(" raise res in get prjoects: ", res);
    } catch (error) {
      setManagerName(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const editUser = () => {
    openModal();
  };

  // save user
  const saveProjectUpdate = async () => {
    closeModal();

    // calling getValues from react-hook-form
    let test = getValues();

    console.log("modified user: ", test);

    const projectId = test.projectId;

    // make http put req

    // try {
    //   let res = await axios.put(
    //     `http://localhost:5000/project-manager/raise-project-update/project/${projectId}`,
    //     test,
    //     {
    //       headers: {
    //         Authorization: "bearer ${token}",
    //       },
    //     }
    //   );
    //   // logging the object
    //   console.log(res);

    //   // setting the data to screen
    //   console.log("res data paylaod: ", res.data.payload);
    //   console.log("res data: ", res.data);
    // } catch (error) {
    //   console.log("error from raise update: ", error);
    //   setManagerName(error.message);
    // }
  };

  const [projects, setProjects] = useState([]);

  const getProjectList = async () => {
    const projectList = await axios.get(
      `http://localhost:5000/project-manager/projects-under-project-manager/${projectManagerId}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    // console.log("get proejct list", projectList);

    // console.log("project list from manager", projectList);
    setProjects(projectList.data.payload);
    // console.log("getting data from pm: ", projectList.data.payload);
    // console.log("projects from state", projects);
  };

  // get project concerns

  const getProjectConcerns = async () => {
    let res = await axios.get(`http://localhost:5000/project-manager//1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const navigate = useNavigate();

  const navigateToDetailedView = (projectId) => {
    navigate(`/project-details/${projectId}`);
  };

  // useEffect get all data from projects TABLE
  useEffect(() => {
    // console.log("get projects called!");
    getProjectList();
    setManagerName(data.userObj.name);
  }, []);

  return (
    <div className="container">
      <div className="first-class">
        <h2 className="mb-4">Welcome Project Manager {managerName}</h2>
        <div className="row justify-content-center">
          <div className="col-sm-4 col-md-6 col-lg-4">
            <Card className="shadow p-3 mb-5 color-this rounded">
              <Card.Body>
                <Card.Title>Raise project concern</Card.Title>
                <Card.Text>
                  Raise a project concern regarding a particular project
                </Card.Text>
                <button onClick={editUser2} className="btn btn-primary">
                  Create
                </button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-4">
            <Card className="shadow p-3 mb-5 color-this rounded">
              <Card.Body>
                <Card.Title>Raise project update</Card.Title>
                <Card.Text>
                  Raise a project update regarding a particular project
                </Card.Text>
                <button onClick={editUser} className="btn btn-primary">
                  Create
                </button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div className="project-list">
        {projects?.length > 0 && (
          <div>
            <h2>Projects under Project manager</h2>
            <table className="table table-hover table-striped border">
              <thead>
                <tr>
                  <th scope="col">Project ID</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Client Account Manager</th>
                  <th scope="col">Project Status</th>
                  <th scope="col">Project Start Date</th>
                  <th scope="col">Project End Date</th>
                  <th scope="col">Project Fitness Indicator</th>
                  <th scope="col">Project Domain</th>
                  <th scope="col">Project Type</th>
                  <th scope="col">GDO ID</th>
                  <th scope="col">Project Manager</th>
                  <th scope="col">Detailed view</th>
                </tr>
              </thead>

              <tbody>
                {projects?.map((project, index) => {
                  return (
                    <tr key={index}>
                      <td>{project.projectId}</td>
                      <td>{project.projectName}</td>
                      <td>{project.clientName}</td>
                      <td>{project.clientAccountManager}</td>
                      <td>{project.projectStatus}</td>
                      <td>{project.projectStartDate}</td>
                      <td>{project.projectEndDate}</td>
                      <td>{project.projectFitnessIndicator}</td>
                      <td>{project.projectDomain}</td>
                      <td>{project.projectType}</td>
                      <td>{project.gdoId}</td>
                      <td>{project.projectManager}</td>
                      <td>
                        <button
                          onClick={() =>
                            navigateToDetailedView(project.projectId)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Detailed View
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

      <div className="second-class">
        {/* modal for raising project concern */}
        <div className="modal2">
          <Modal show={showModal2} onHide={closeModal2} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Raise project concern</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* use edit form */}
              <form className="p-3 bg-white text-dark rounded">
                {/* register your input into the hook by invoking the "register" function */}

                <div className="col">
                  <label htmlFor="projectIdd">Project ID</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("projectIdd", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectIdd && (
                    <span className="text-danger">projectId is required</span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectNamee">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("projectNamee", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectNamee && (
                    <span className="text-danger">projectName is required</span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="clientNamee">Client Name</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("clientNamee", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.clientName && (
                    <span className="text-danger">ClientName is required</span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="clientAccountManagerr">
                    Client Account Manager
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("clientAccountManagerr", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.clientAccountManagerr && (
                    <span className="text-danger">
                      clientAccountManager is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectStatuss">Project Status</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("projectStatuss", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectStatuss && (
                    <span className="text-danger">
                      projectStatus is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectStartDatee">Project Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("projectStartDatee", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectStartDatee && (
                    <span className="text-danger">
                      projectStartDate is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectEndDatee">Project End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("projectEndDatee", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectEndDatee && (
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
                    <option value="" disabled>
                      Select fitness
                    </option>
                    <option value="g">Green</option>
                    <option value="a">Amber</option>
                    <option value="r">Red</option>
                  </select>
                  {/* errors will return when field validation fails  */}
                  {errors.projectFitnessIndicator && (
                    <span className="text-danger">
                      Project Fitness Indicator is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectDomainn">Project Domain</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("projectDomainn", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectDomainn && (
                    <span className="text-danger">
                      Project Domain is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectTypee">Project Type</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("projectTypee", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectTypee && (
                    <span className="text-danger">
                      Project Type is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="gdoIdd">GDO ID</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("gdoIdd", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.gdoIdd && (
                    <span className="text-danger">GDO Id is required</span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectManagerr">Project Manager ID</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("projectManagerr", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectManagerr && (
                    <span className="text-danger">
                      projectManager is required
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

        <div>
          <Modal show={showModal} onHide={closeModal} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Raise project update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* use edit form */}
              <form className="p-3 bg-white text-dark rounded">
                {/* register your input into the hook by invoking the "register" function */}

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
                  {errors.projectId && (
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
                  {errors.updateDate && (
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
                  {errors.clientAccountManager && (
                    <span className="text-danger">
                      Client Account Manager is required
                    </span>
                  )}
                </div>

                <div className="col">
                  <label htmlFor="projectStatus">Project Status</label>
                  <input
                    name="projectStatus"
                    type="text"
                    className="form-control"
                    {...register("projectStatus", {
                      required: true,
                    })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.projectStatus && (
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
                    <option value="" disabled>
                      Select fitness
                    </option>
                    <option value="g">Green</option>
                    <option value="a">Amber</option>
                    <option value="r">Red</option>
                  </select>
                  {/* errors will return when field validation fails  */}
                  {errors.projectFitnessIndicator && (
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
                  {errors.projectManager && (
                    <span className="text-danger">
                      Project Manager is required
                    </span>
                  )}
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={saveProjectUpdate}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
