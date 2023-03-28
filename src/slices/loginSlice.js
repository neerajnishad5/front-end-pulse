// importing create slice and create thunk function
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import axios to make API requests
import axios from "axios";

// thunk middleware for login
export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (userObject, { rejectWithValue }) => {
    // reject with value is object and 2nd paramter in createAsyncThunk

    try {
      // logging in using post
      let res = await axios.post(
        "http://localhost:5000/user/login",
        userObject
      );

      // checking res
      console.log("Res in slice is: ", res);

      if (res.data.Message === "Login successful!") {
        // store token to session storage or local no matter
        sessionStorage.setItem("token", res.data.token);
        return res.data;
        // localStorage.setItem("token", res.data.token);
      } else {
        console.log("error in else : ", res.data.message);
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log("error is: ", error);
      return rejectWithValue(error);
    }
  }
);

// create slice and export
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userObj: {},
    status: "idle",
    errorMessage: "",
  },
  reducers: {
    clearState: (state, actionObj) => {
      state.userObj = {};
      state.errorMessage = "";
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // console.log("action from bulider addCase: ", action);
      state.userObj = action.payload.user;
      state.errorMessage = "";
      state.status = "success";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.errorMessage = action.payload.message;
      state.status = "failed";
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearState } = loginSlice.actions;

// export all reducers as single reducer object
export default loginSlice.reducer;
