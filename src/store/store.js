import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicies/userSlice";
import scheduleReducer from "./slicies/scheduleSlice";
import employeesReducer from "./slicies/employeesSlice";
import stationsReducer from "./slicies/stationsSlice";
import routesReducer from "./slicies/routesSlice";
import busesReducer from "./slicies/busesSlice";
import departuresReducer from "./slicies/departuresSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    schedule: scheduleReducer,
    employees: employeesReducer,
    stations: stationsReducer,
    routes: routesReducer,
    buses: busesReducer,
    departures: departuresReducer,
  },
});
