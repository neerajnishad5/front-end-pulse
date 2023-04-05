import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../slices/loginSlice";
import image from "../images/loginpage.svg";

// Login function
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for user role not defined
  const [message, setMessage] = useState("");
  const [assignStatus, setassignStatus] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const data = useSelector((state) => state.login);
  const role = data.userObj.role;

  console.log("user obj from login: ", data);

  // on user submit details
  const onSubmit = async (user) => {
    try {
      // user from form
      console.log(user);
      dispatch(userLogin(user));

      let res = await axios.post("http://localhost:5000/user/login", user);
      console.log("res in Login: ", res);

      // getting token from payload
      const token = res.data.token;
      if (role == "notAssigned") {
        setassignStatus("Logged in but user role not assigned!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }

      // setting token to session storage
      sessionStorage.setItem("token", token);

      if (res.data.Message === "Login successful!") {
        if (res.data.user.role === "gdo")
          navigate(`/gdo/${res.data.user.email}`);
        else if (res.data.user.role === "superAdmin")
          navigate(`/superAdmin/${res.data.user.email}`);
        else if (res.data.user.role === "projectManager")
          navigate(`/projectManager/${res.data.user.email}`);
        else if (res.data.user.role === "specialUser")
          navigate(`/specialUser/${res.data.user.email}`);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // returning react element
  return (
    <div className="d-flex justify-content-center align-items-center background-add">
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center">
          <div
            style={{ width: "30rem" }}
            className="container shadow p-3 mb-5 bg-white rounded"
          >
            <h2 className="text-danger">{message}</h2>
            <h2 className="text-warning">{assignStatus}</h2>
            <h2 className="mb-4">Login</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-3 text-dark form-group bg-light border"
            >
              {/* register your input into the hook by invoking the "register" function */}

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
                {errors.email && (
                  <span className="text-danger">Email ID is required</span>
                )}
              </div>

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
                {errors.password && (
                  <span className="text-danger">Password is required</span>
                )}
              </div>

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
    </div>
  );
}
