import "./ForgotPassword.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Login function
export default function ForgotPassword() {
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

      let res = await axios.post("http://localhost:5000/posts");
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

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 bg-dark text-white"
      >
        {/* register your input into the hook by invoking the "register" function */}

        <div className="col">
          <label htmlFor="email">Email Address</label>
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
  );
}
