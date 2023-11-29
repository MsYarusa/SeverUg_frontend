import { createSlice } from "@reduxjs/toolkit";
import { getEmployees } from "../components/pages/employees/GetEmployees";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    roles: [],
    status: null,
    error: null,
  },
  reducers: {},
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

export default employeesSlice.reducer;
