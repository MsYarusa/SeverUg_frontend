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
      state.routes.push(action.payload.route);
    },
    updateRoute(state, action) {
      state.routes.forEach((item, i, arr) => {
        if (item.id === action.payload.id) {
          arr[i] = action.payload.route;
        }
      });
    },
    removeRoute(state, action) {
      state.routes = state.routes.filter(
        (route) => route.id !== action.payload.id
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
