import { createSlice } from "@reduxjs/toolkit";
import { getStations } from "../requests/StationsRequests";

const stationsSlice = createSlice({
  name: "stations",
  initialState: {
    stations: [],
    status: null,
    error: null,
  },
  reducers: {},
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

export default stationsSlice.reducer;
