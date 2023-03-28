import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from '../features/counter/usersSlice'
import loginReducer from "./slices/loginSlice";


// default export store
export default configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
  },
});
