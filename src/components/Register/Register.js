import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

      let res = await axios.post("http://localhost:5000/user/register", user);
      console.log("res in register: ", res);

      // make post requuest here
      if (res.data.Message === "User Registered") {
        console.log("User created!");
        setMessage("Registered!");
      } else if (res.data.Message === "User already exists!") {
        console.log(res.data.Message);
        setMessage(res.data.Message);
      } else if (res.data.Message === "Not an employee!") {
        console.log(res.data.Message);
        setMessage(res.data.Message);
      }
    } catch (error) {
      console.log("error: ", error);
      console.log("Internal error: ", error.ua.response.data.Message);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="container">
      <h2>{message}</h2>
      <h2>Register User</h2>
      <form
        className="p-3 text-dark bg-light "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}

        <div className="col">
          <label className="text-left" htmlFor="username">
            User ID
          </label>
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

        {/* Name field */}
        <div className="col">
          <label htmlFor="username">Name</label>
          <input
            className="form-control"
            {...register("username", {
              required: true,
            })}
          />
          {/* errors will return when field validation fails  */}
          {errors.username && (
            <span className="text-danger">Username is required</span>
          )}
        </div>

        {/* email */}
        <div className="col   ">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            {...register("email", {
              required: true,
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //   message: "Invalid email address!",
              // },
            })}
          />

          {/* errors will return when field validation fails  */}
          {errors.email && (
            <span className="text-danger">Email is required</span>
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
              Register
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-success d-block mx-auto btn-md mt-3"
              type="submit"
              onClick={navigateToLogin}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
