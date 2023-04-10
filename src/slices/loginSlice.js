// importing create slice and create thunk function
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import axios to make API requests
import axios from "axios";

// thunk middleware for login
export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (userObject, { rejectWithValue }) => {
    // reject with value is object and 2nd paramter in createAsyncThunk

    // console.log("User object in loginslice", userObject);

    try {
      // logging in using post
      let res = await axios.post(
        "http://localhost:5000/user/login",
        userObject
      );

      // checking res
      // console.log("Res in slice is: ", res);

      if (res.data.Message === "Login successful!") {
        // store token to session storage or local no matter
        sessionStorage.setItem("token", res.data.token);
        // localStorage.setItem()

        sessionStorage.setItem("status", "success");

        // setting the userObj to localStorage for getting access to the role and userId logged in
        localStorage.setItem("userObj", JSON.stringify(res.data.user));
        return res.data;
      } else {
        // console.log("error in else: ", res.data.message);
        throw new Error(res.data.message);
      }
    } catch (error) {
      // console.log("error is: ", error);
      return rejectWithValue(error);
    }
  }
);

// checking if user exists or not and setting the user variable accordingly otherwise will always get idle state
let user = localStorage.getItem("userObj");
if (user) {
  user = JSON.parse(user);
} else {
  user = {};
}

let status = sessionStorage.getItem("status");
if (status !== "success") {
  status = "idle";
}

// create slice and export
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userObj: user,
    status: status,
    role: "",
    errorMessage: "",
    email: "",
  },
  reducers: {
    clearState: (state, actionObj) => {
      state.userObj = {};
      state.errorMessage = "";
      state.status = "idle";
      state.role = "";
      state.role = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.status = "pending";
      // console.log("action from bulider addCase1: ", action);
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // console.log("action from bulider addCase2: ", action);
      state.userObj = action.payload.user;
      state.errorMessage = "";
      state.status = "success";
      state.role = action.payload.user.role;
      state.email = action.payload.user.email;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.errorMessage = action.payload.Message;
      state.status = "failed";
      state.role = "";
      state.email = "";
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearState } = loginSlice.actions;

// export all reducers as single reducer object
export default loginSlice.reducer;