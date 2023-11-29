import { createSlice } from "@reduxjs/toolkit";
import { getStations } from "../requests/StationsRequests";

const stationsSlice = createSlice({
  name: "stations",
  initialState: {
    stations: [],
    status: null,
    error: null,
  },
  reducers: {
    addStation(state, action) {
      state.stations.push(action.payload.station);
    },
    updateStation(state, action) {
      state.stations.forEach((item, i, arr) => {
        if (item.id === action.payload.id) {
          arr[i] = action.payload.station;
        }
      });
    },
    removeStation(state, action) {
      state.stations = state.stations.filter(
        (station) => station.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { addStation, updateStation, removeStation } =
  stationsSlice.actions;
export default stationsSlice.reducer;
