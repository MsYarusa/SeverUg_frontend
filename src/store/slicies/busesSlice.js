import { createSlice } from "@reduxjs/toolkit";
import { getBuses, getModels } from "../requests/BusesRequests";

const busesSlice = createSlice({
  name: "buses",
  initialState: {
    buses: [],
    models: [],
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
    addDriverToBus(state, action) {
      state.buses.forEach((bus, i, arr) => {
        if (bus.id === action.payload.bus_id) {
          bus.drive_id = action.payload.driver_id;
        }
      });
    },
    removeDriverInBus(state, action) {
      state.buses.forEach((bus, i, arr) => {
        if (bus.drive_id === action.payload.id) {
          bus.drive_id = null;
        }
      });
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
        state.buses = action.payload;
      })
      .addCase(getBuses.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getModels.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getModels.fulfilled, (state, action) => {
        state.status = "resolved";
        state.models = action.payload;
      })
      .addCase(getModels.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {
  addBus,
  updateBus,
  removeBus,
  addDriverToBus,
  removeDriverInBus,
} = busesSlice.actions;
export default busesSlice.reducer;
