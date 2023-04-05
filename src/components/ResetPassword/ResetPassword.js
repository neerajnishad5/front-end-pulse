import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// importing bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // dispaly message of reset password
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");

  // navigate
  const navigate = useNavigate();

  // on user submit details
  const onSubmit = async (user) => {
    // email from password to send OTP
    console.log("User from onSubmit: ", user);

    try {
      let res = await axios.put(
        `http://localhost:5000/user/reset-password`,
        user
      );
      console.log("res in reset pass: ", res);
      setMessage("Password reset successfully!");

      // make post requuest here
      // if (res.status === 201) {
      //   console.log("Password reset done!");
      //   navigate("/login");
      // }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div
      className="container shadow p-3 mb-5 bg-white rounded"
      style={{ width: "30rem" }}
    >
      <h2>{message}</h2>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 text-dark" method="put">
        {/* register your input into the hook by invoking the "register" function */}

        <div className="col">
          <label className="d-flex mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: true,
            })}
          />
          {/* errors will return when field validation fails  */}
          {errors.email && (
            <span className="text-danger">Email Address is required</span>
          )}
        </div>

        <div className="col">
          <label className="d-flex mb-2" htmlFor="otp">
            OTP
          </label>
          <input
            type="number"
            className="form-control"
            {...register("otp", {
              required: true,
            })}
          />
          {/* errors will return when field validation fails  */}
          {errors.otp && <span className="text-danger">OTP is required</span>}
        </div>

        <div className="col">
          <label className="d-flex mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            {...register("password", {
              required: true,
            })}
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
