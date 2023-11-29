import { createSlice } from "@reduxjs/toolkit";
import { getRoutes } from "../requests/RoutesRequests";

const routesSlice = createSlice({
  name: "routes",
  initialState: {
    routes: [],
    status: null,
    error: null,
  },
  reducers: {
    addRoute(state, action) {
      state.schedule.push(action.payload.trip);
    },
    updateRoute(state, action) {
      state.schedule.forEach((item, i, arr) => {
        if (item.id === action.payload.id) {
          arr[i] = action.payload.trip;
        }
      });
    },
    removeRoute(state, action) {
      state.schedule = state.schedule.filter(
        (trip) => trip.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoutes.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.status = "resolved";
        state.routes = action.payload;
      })
      .addCase(getRoutes.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { addRoute, updateRoute, removeRoute } = routesSlice.actions;
export default routesSlice.reducer;
