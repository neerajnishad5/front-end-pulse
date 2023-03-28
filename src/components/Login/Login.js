import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Login function
export default function Login() {
  const navigate = useNavigate();
  // for user role not defined
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // on user submit details
  const onSubmit = async (user) => {
    try {
      // user from register
      console.log(user);

      let res = await axios.post("http://localhost:5000/user/login", user);
      console.log("res in Login: ", res);

      // getting token from payload
      const token = res.data.token;

      // setting token to session storage
      sessionStorage.setItem("token", token);

      if (res.data.Message === "Login successful!") {
        if (res.data.userRole === "gdo") navigate("/gdo");
        else if (res.data.userRole === "superAdmin") navigate("/super-admin");
        else if (res.data.userRole === "projectManager")
          navigate("/project-manager");
        else if (res.data.userRole === "specialUser") navigate("/special-user");
       
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div>
      <h2 className="text-danger">{message}</h2>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 text-dark form-group"
      >
        {/* register your input into the hook by invoking the "register" function */}

        <div className="col">
          <label htmlFor="username"> User ID</label>
          <input
            className="form-control"
            {...register("userId", {
              required: true,
            })}
          />
          {/* errors will return when field validation fails  */}
          {errors.userId && (
            <span className="text-danger">User ID is required</span>
          )}
        </div>

        {/* password */}
        <div className="  col  ">
          <label htmlFor="dob">Password</label>
          <input
            type="password"
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
              onClick={navigateToForgotPassword}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
