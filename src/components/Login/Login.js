import "./Login.css";
import { useForm } from "react-hook-form";

// importing axios for making API requests
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../slices/loginSlice";

// importing images
import image from "../images/loginpage.svg";

// Login function
export default function Login() {
  // initializing dispatch
  const dispatch = useDispatch();

  // initializing navigate
  const navigate = useNavigate();

  // states
  const [wrongPassword, setWrongPassword] = useState("");
  const [assignStatus, setassignStatus] = useState("");
  const [notRegistered, setNotRegistered] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const data = useSelector((state) => state.login);
  const role = data.userObj.role;

  console.log("user obj from login: ", data);

  // on user submit details
  const onSubmit = async (user) => {
    try {
      // dispatching user to store
      dispatch(userLogin(user));

      setIsLoading(true);

      // making login request
      let res = await axios.post("http://localhost:5000/user/login", user);
      console.log("res in Login: ", res);
      if (res.data.Message === "User not found!") {
        setNotRegistered("User not registered!");
      }

      // getting token from payload
      const token = res.data?.token;
      if (role === "notAssigned" || role === null) {
        setassignStatus("Logged in but user role not assigned!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }

      // setting token to session storage
      sessionStorage.setItem("token", token);

      // email from userObj
      const email = res.data.user.email;

      if (res.data.Message === "Login successful!") {
        if (res.data.user.role === "gdo") navigate(`/gdo/${email}`);
        else if (res.data.user.role === "superAdmin")
          navigate(`/superAdmin/${email}`);
        else if (res.data.user.role === "projectManager")
          navigate(`/projectManager/${email}`);
        else if (res.data.user.role === "admin") navigate(`/admin/${email}`);
      }
    } catch (error) {
      setWrongPassword(error.response.data?.Message);
      console.log("error: ", error);
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div class="spinner-border text-success" role="status">
        <span class="sr-only"></span>
      </div>
    );

  // returning react element
  return (
    <>
      <div className="d-flex justify-content-center align-items-center background-add">
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <div
              style={{ width: "30rem" }}
              className="container shadow p-3 mb-5 bg-white rounded"
            >
              <h2 className="text-danger">{wrongPassword}</h2>
              <h2 className="text-warning">{assignStatus}</h2>

              <h2 className="mb-4">Login</h2>
              <h3 className="text-danger">{notRegistered}</h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-3 text-dark form-group bg-light border"
              >
                <div className="col ">
                  <label className="float-start mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.email?.type === "required" && (
                    <span className="text-danger float-start">
                      Email ID is required
                    </span>
                  )}
                </div>

                <br />
                {/* password */}
                <div className="col">
                  <label className="float-start mb-2" htmlFor="dob">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    {...register("password", { required: true })}
                  />

                  {/* errors will return when field validation fails  */}
                  {errors.password?.type === "required" && (
                    <span className="text-danger float-start">
                      Password is required
                    </span>
                  )}
                </div>
                <br />

                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-success d-block mx-auto btn-md mt-3"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-success d-block mx-auto btn-md mt-3"
                      type="submit"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col">
            <img src={image} alt="login image" />
          </div>
        </div>
      </div>{" "}
    </>
  );
}
