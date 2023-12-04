import { createSlice } from "@reduxjs/toolkit";
import { getSchedule } from "../requests/ScheduleRequests";

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
    updateRouteInTrip(state, action) {
      state.schedule.forEach((item, i, arr) => {
        if (item.road.id === action.payload.id) {
          arr[i].road = action.payload.route;
        }
      });
    },
    updateStationInTrip(state, action) {
      state.schedule.forEach((trip, i, arr) => {
        let station = trip.road.stations.find(
          (station) => station.id === action.payload.id
        );
        if (station) {
          station.name = action.payload.name;
        }
      });
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

export const {
  addTrip,
  updateTrip,
  removeTrip,
  updateRouteInTrip,
  updateStationInTrip,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
