import { createSlice } from "@reduxjs/toolkit";
import { getEmployees } from "../requests/EmployeesRequests";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    roles: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.status = "resolved";
        state.employees = action.payload.employees;
        state.roles = action.payload.roles;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { addEmployee, updateEmployee, removeEmployee } =
  employeesSlice.actions;
export default employeesSlice.reducer;
