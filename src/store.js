import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";

// default export store
export default configureStore({
  reducer: {
    login: loginReducer,
  },
});