import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
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
      console.log("res in register: ", res);

      // make post requuest here
      if (res.status === 201) {
        console.log("User created!");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <form
        className="p-3 bg-dark text-white rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}

        <div className="col">
          <label htmlFor="username">Employee/User ID</label>
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
