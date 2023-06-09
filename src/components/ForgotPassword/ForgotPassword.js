import "./ForgotPassword.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { useState } from "react";

// Login Function
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all"
  });
  const [message, setMessage] = useState("");

  // server url from env file
  const SERVER_URL = process.env.REACT_APP_SERVER_URL; 

  // on user submit details
  const onSubmit = async (email) => {
    try {
      // email from password to send otp
      console.log("Logging mail", email);

      let res = await axios.post(
        `${SERVER_URL}/user/forgot-password`,
        email
      );
      console.log("Res in forgot pas: ", res);

      // make post requuest here
      if (res.status === 201) {
        console.log("Email sent!");
      }
      setMessage(
        `Link sent to your email: ${email.email}. Click on the link to reset your password. Valid for 15 mins. Thank you! - WAL PULSE`
      );
      // navigate("/reset-password");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center">
      {message.length > 0 ? (
        <div className="container">
          <h2>{message}</h2>{" "}
        </div>
      ) : (
        <div
          style={{ width: "30rem" }}
          className="container shadow p-3 mb-5 bg-white "
        >
          <h2 className="text-dark mb-3">Forgot Password</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="p-3 text-dark">
            {/* register your input into the hook by invoking the "register" function */}

            <div className="col text-left">
              <label className="d-flex" htmlFor="email">
                Email Address
              </label>
              <input
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
      )}
    </div>
  );
}
