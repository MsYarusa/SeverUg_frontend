import { createSlice } from "@reduxjs/toolkit";
import { getBuses } from "../requests/BusesRequests";

const busesSlice = createSlice({
  name: "buses",
  initialState: {
    buses: [],
    status: null,
    error: null,
  },
  reducers: {
    addBus(state, action) {
      state.buses.push(action.payload.bus);
    },
    updateBus(state, action) {
      state.buses.forEach((item, i, arr) => {
        if (item.id === action.payload.id) {
          arr[i] = action.payload.bus;
        }
      });
    },
    removeBus(state, action) {
      state.buses = state.buses.filter((bus) => bus.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuses.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBuses.fulfilled, (state, action) => {
        state.status = "resolved";
        state.buses = action.payload.buses;
      })
      .addCase(getBuses.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { addBuses, updateBuses, removeBuses } = busesSlice.actions;
export default busesSlice.reducer;
