import { createSlice } from "@reduxjs/toolkit";
import { getSchedule } from "../components/sсhedule/GetSchedule";

const userSlice = createSlice({
  name: "schedule",
  initialState: {
    schedule: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchedule.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.status = "resolved";
        state.schedule = action.payload;
      })
      .addCase(getSchedule.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
