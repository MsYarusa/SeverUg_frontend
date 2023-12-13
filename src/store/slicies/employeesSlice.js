import { createSlice } from "@reduxjs/toolkit";
import { getEmployees, getDrivers } from "../requests/EmployeesRequests";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    drivers: [],
    status: null,
    error: null,
  },
  reducers: {
    addEmployee(state, action) {
      state.employees.push(action.payload.employee);
    },
    updateEmployee(state, action) {
      state.employees.forEach((item, i, arr) => {
        if (item.id === action.payload.id) {
          arr[i] = action.payload.employee;
        }
      });
    },
    removeEmployee(state, action) {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload.id
      );
    },
    addDriver(state, action) {
      state.drivers.push(action.payload.driver);
    },
    updateDriver(state, action) {
      state.drivers.forEach((item, i, arr) => {
        if (item.id === action.payload.id) {
          arr[i] = action.payload.driver;
        }
      });
    },
    removeDriver(state, action) {
      state.drivers = state.drivers.filter(
        (driver) => driver.id !== action.payload.id
      );
    },
    addBusToDriver(state, action) {
      state.drivers.forEach((driver, i, arr) => {
        if (driver.id === action.payload.driver_id) {
          driver.bus_id = action.payload.bus_id;
        }
      });
    },
    removeBusInDriver(state, action) {
      state.drivers.forEach((driver, i, arr) => {
        if (driver.bus_id === action.payload.id) {
          driver.bus_id = null;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.status = "resolved";
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getDrivers.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        state.status = "resolved";
        state.drivers = action.payload;
      })
      .addCase(getDrivers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {
  addEmployee,
  updateEmployee,
  removeEmployee,
  addDriver,
  updateDriver,
  removeDriver,
  addBusToDriver,
  removeBusInDriver,
} = employeesSlice.actions;
export default employeesSlice.reducer;
