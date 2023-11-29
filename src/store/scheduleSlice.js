import { createSlice } from "@reduxjs/toolkit";
import { getSchedule } from "../requests/SheduleRequests";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedule: [],
    status: null,
    error: null,
  },
  reducers: {
    addTrip(state, action) {
      state.schedule.push(action.payload.trip);
    },
    updateTrip(state, action) {
      state.schedule.forEach((item, i, arr) => {
        if (item.id === action.payload.id) {
          arr[i] = action.payload.trip;
        }
      });
    },
    removeTrip(state, action) {
      state.schedule = state.schedule.filter(
        (trip) => trip.id !== action.payload.id
      );
    },
  },
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

export const { addTrip, updateTrip, removeTrip } = scheduleSlice.actions;
export default scheduleSlice.reducer;
