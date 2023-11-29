import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import scheduleReducer from "./scheduleSlice";
import employeesReducer from "./employeesSlice";
import stationsReducer from "./stationsSlice";
import routesReducer from "./routesSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    schedule: scheduleReducer,
    employees: employeesReducer,
    stations: stationsReducer,
    routes: routesReducer,
  },
});
