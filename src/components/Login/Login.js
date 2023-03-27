import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Login function
export default function Login() {
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

      let res = await axios.post("http://localhost:5000/users", user);
      console.log("res in Login: ", res);

      // make post requuest here
      if (res.status === 201) {
        console.log("User created!");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const navigate = useNavigate();

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div>
      <form className="p-3 bg-dark text-white ">
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
              onSubmit={handleSubmit(onSubmit)}
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
