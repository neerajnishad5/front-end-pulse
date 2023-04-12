import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../images/register.svg";

export default function Register() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // const [isHome, setIsHome] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  // on user submit details
  const onSubmit = async (user) => {
    try {
      // user from register
      console.log("user from registereere: ", user);

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
    <div className="row d-flex background-this">
      <div className="col">
        <div>
          <div
            style={{ width: "28rem" }}
            className="container shadow p-3 mb-5 bg-white "
          >
            <h2 className="text-danger">{message}</h2>
            <h2 className="mb-2">Register User</h2>
            <form
              className="p-3 text-dark bg-light border "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col">
                <label className="d-flex mb-2" htmlFor="userId">
                  User ID
                </label>
                <input
                  name="userId"
                  className="form-control"
                  {...register("userId", {
                    required: true,
                  })}
                />
                {/* errors will return when field validation fails  */}
                {errors.userId?.type === "required" && (
                  <span className="text-danger">User ID is required</span>
                )}
              </div>

              {/* Name field */}
              <div className="col">
                <label className="d-flex mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  name="name"
                  className="form-control"
                  {...register("name", {
                    required: true,
                  })}
                />
                {/* errors will return when field validation fails  */}
                {errors.name?.type === "required" && (
                  <span className="text-danger">Username is required</span>
                )}
              </div>

              {/* email */}
              <div className="col">
                <label className="d-flex mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  className="form-control"
                  {...register("email", {
                    required: true,
                  })}
                />

                {/* errors will return when field validation fails  */}
                {errors.email?.type === "required" && (
                  <span className="text-danger">Email is required</span>
                )}
              </div>

              {/* password */}
              <div className="  col  ">
                <label className="d-flex mb-2" htmlFor="dob">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  {...register("password", { required: true })}
                />

                {/* errors will return when field validation fails  */}
                {errors.password?.type === "required" && (
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
        </div>
      </div>
      <div className="col">
        <img src={image} alt="register" />
      </div>
    </div>
  );
}
