import axios from "axios";
// useForm
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

export default function UpdateProject({ getProjects }) {
  // getting token from session storage
  const token = sessionStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const { id } = useParams();
  const projectId = id;
  const data = useSelector((state) => state.login);
  const email = data.userObj.email;

  const navigate = useNavigate();

  // server url from env file
  const SERVER_URL = process.env.REACT_APP_SERVER_URL; 

  console.log("Printing id:", projectId);

  const onSubmit = async (projectUpdate) => {
    console.log("project update", projectUpdate);

    projectUpdate.projectId = projectId;
    // projectUpdate.date = new Date();
    

    try {
      let res = await axios.put(
        `${SERVER_URL}/gdo/update-project/project/${projectId}`,
        projectUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/gdo/${email}`);
      console.log("project res", res);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="container">
      <h2>Update Project Details</h2>
      <div className="update-project-form d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "30rem" }}
          className="shadow p-3 mb-5 bg-white rounded p-3 bg-light text-dark"
        >
          <div className="col   ">
            <label className="d-flex mx-auto" htmlFor="projectName">
              Project Name
            </label>
            <input
              type="text"
              className="form-control"
              {...register("projectName", {
                required: true,
              })}
            />

            {/* errors will return when field validation fails  */}
            {errors.projectName?.type === "required" && (
              <span className="text-danger d-flex mx-auto">
                Project Name is required
              </span>
            )}
          </div>

          <div className="col   ">
            <label className="d-flex mx-auto" htmlFor="clientName">
              Client Name
            </label>
            <input
              type="text"
              className="form-control"
              {...register("clientName", {
                required: true,
              })}
            />

            {/* errors will return when field validation fails  */}
            {errors.clientName?.type === "required" && (
              <span className="text-danger d-flex mx-auto">
                Client Name is required
              </span>
            )}
          </div>

          <div className="col   ">
            <label className="d-flex mx-auto" htmlFor="clientAccountManager">
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
              <span className="text-danger d-flex mx-auto">
                Client Account Manager is required
              </span>
            )}
          </div>

          <div className="col">
            <label className="d-flex mx-auto" htmlFor="projectStatus">
              Project Status
            </label>
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
              <span className="text-danger d-flex mx-auto">
                Project Status is required
              </span>
            )}
          </div>

          <div className="  col  ">
            <label className="d-flex mx-auto" htmlFor="projectStartDate">
              Project Start Date
            </label>
            <input
              type="date"
              className="form-control"
              {...register("projectStartDate", { required: true })}
            />

            {/* errors will return when field validation fails  */}
            {errors.projectStartDate?.type === "required" && (
              <span className="text-danger d-flex mx-auto">
                Project Start Date is required
              </span>
            )}
          </div>

          <div className="  col  ">
            <label className="d-flex mx-auto" htmlFor="projectEndDate">
              Project End Date
            </label>
            <input
              type="date"
              className="form-control"
              {...register("projectEndDate")}
            />

            {/* errors will return when field validation fails  */}
            {errors.projectEndDate?.type === "required" && (
              <span className="text-danger d-flex mx-auto">
                Project End Date is required
              </span>
            )}
          </div>

          <div className="col">
            <label className="d-flex mx-auto" htmlFor="projectFitnessIndicator">
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
              <span className="text-danger d-flex mx-auto">
                Project Fitness Indicator is required
              </span>
            )}
          </div>

          <div className="col">
            <label className="d-flex mx-auto" htmlFor="projectDomain">
              Project Domain
            </label>
            <input
              type="text"
              className="form-control"
              {...register("projectDomain", {
                required: true,
              })}
            />

            {/* errors will return when field validation fails  */}
            {errors.projectDomain?.type === "required" && (
              <span className="text-danger d-flex mx-auto">
                Project Domain is required
              </span>
            )}
          </div>

          <div className="col">
            <label className="d-flex mx-auto" htmlFor="projectType">
              Project Type
            </label>

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
              <option value="Performance Testing">Performance Testing</option>
            </select>

            {/* errors will return when field validation fails  */}
            {errors.projectType?.type === "required" && (
              <span className="text-danger d-flex mx-auto">
                Project Type is required
              </span>
            )}
          </div>

          <div className="col">
            <label className="d-flex mx-auto" htmlFor="gdoId">
              GDO ID
            </label>
            <input
              type="number"
              className="form-control"
              {...register("gdoId", {
                required: true,
              })}
            />

            {/* errors will return when field validation fails  */}
            {errors.gdoId?.type === "required" && (
              <span className="text-danger d-flex mx-auto">
                GDO ID is required
              </span>
            )}
          </div>

          <div className="col">
            <label className="d-flex mx-auto" htmlFor="projectManager">
              Project Manager ID
            </label>
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
              <span className="text-danger d-flex mx-auto">
                Project Manager ID is required
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-success mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
