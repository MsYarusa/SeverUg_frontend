import { createSlice } from "@reduxjs/toolkit";
import { getSchedule } from "../requests/ScheduleRequests";
import { schedule } from "../../tests/TestData/TestSchedule";

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
    removeTripByStation(state, action) {
      state.schedule = state.schedule.filter(
        (trip) =>
          !trip.road.stations.find(
            (station) => station.id === action.payload.id
          )
      );
    },
    removeTripByRoute(state, action) {
      state.schedule = state.schedule.filter(
        (trip) => trip.road.id !== action.payload.route.id
      );
    },
    updateBusInTrip(state, action) {
      state.schedule.forEach((trip, i, arr) => {
        if (trip.bus === action.payload.id) {
          trip.bus = action.payload.bus;
        }
      });
    },
    updateDriverInTrip(state, action) {
      state.schedule.forEach((trip, i, arr) => {
        if (trip.driver === action.payload.id) {
          trip.driver = action.payload.driver;
        }
      });
    },
    removeTripByBus(state, action) {
      state.schedule = state.schedule.filter(
        (trip) => trip.bus.id !== action.payload.id
      );
    },
    removeTripByDriver(state, action) {
      state.schedule = state.schedule.filter(
        (trip) => trip.driver.id !== action.payload.id
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

export const {
  addTrip,
  updateTrip,
  removeTrip,
  updateRouteInTrip,
  updateStationInTrip,
  removeTripByRoute,
  removeTripByStation,
  updateBusInTrip,
  updateDriverInTrip,
  removeTripByBus,
  removeTripByDriver,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
