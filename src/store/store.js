import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import scheduleReducer from "./scheduleSlice";
import employeesReducer from "./employeesSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    schedule: scheduleReducer,
    employees: employeesReducer,
  },
});
