import { createSlice } from "@reduxjs/toolkit";
import { getSchedule } from "../components/schedule/ScheduleApi/GetSchedule";
import { getStations } from "../components/schedule/ScheduleApi/GetStations";

const userSlice = createSlice({
  name: "schedule",
  initialState: {
    schedule: [],
    stations: [],
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
      })
      .addCase(getStations.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStations.fulfilled, (state, action) => {
        state.status = "resolved";
        state.stations = action.payload;
      })
      .addCase(getStations.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
