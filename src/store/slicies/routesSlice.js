import { createSlice } from "@reduxjs/toolkit";
import {
  getRoutes,
  getCostGroup,
  getTimeGroup,
} from "../requests/RoutesRequests";
import { addToTable } from "../../extraFunctions/ExtraFunctions";

const routesSlice = createSlice({
  name: "routes",
  initialState: {
    routes: [],
    timeTable: [],
    costTable: [],
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
    updateStationInRoute(state, action) {
      state.routes.forEach((route, i, arr) => {
        let station = route.stations.find(
          (station) => station.id === action.payload.id
        );
        if (station) {
          station.name = action.payload.name;
        }
      });
    },
    removeRouteByStation(state, action) {
      state.routes = state.routes.filter(
        (route) =>
          !route.stations.find((station) => station.id === action.payload.id)
      );
    },
    updateTimeInRoute(state, action) {
      let station1 = action.timeGroup.station_1;
      let station2 = action.timeGroup.station_2;
      let value = action.timeGroup.time;

      state.routes.forEach((route, i, arr) => {
        route.stations.slice(0, -1).forEach((station, i, arr) => {
          if (station.id === station1 && arr[i + 1].id === station2) {
            route.time[i] = value.toString();
          }
        });
      });
    },
    updateCostInRoute(state, action) {
      let station1 = action.costGroup.station_1;
      let station2 = action.costGroup.station_2;
      let value = action.costGroup.cost;

      state.routes.forEach((route, i, arr) => {
        route.stations.slice(0, -1).forEach((station, i, arr) => {
          if (station.id === station1 && arr[i + 1].id === station2) {
            route.cost[i] = value.toString();
          }
        });
      });
    },
    addTimeGroup(state, action) {
      let station1 = action.timeGroup.station_1;
      let station2 = action.timeGroup.station_2;
      let value = action.timeGroup.time;
      addToTable(state.timeTable, station1, station2, value);
    },
    addCostGroup(state, action) {
      let station1 = action.costGroup.station_1;
      let station2 = action.costGroup.station_2;
      let value = action.costGroup.cost;
      addToTable(state.costTable, station1, station2, value);
    },
  },
  extraReducers: (builder) => {
    builder
      // получение маршрутов
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
      })
      // получение групп по времени
      .addCase(getTimeGroup.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTimeGroup.fulfilled, (state, action) => {
        state.status = "resolved";
        state.timeTable = action.payload;
      })
      .addCase(getTimeGroup.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      // получение групп по стоимости
      .addCase(getCostGroup.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCostGroup.fulfilled, (state, action) => {
        state.status = "resolved";
        state.costTable = action.payload;
      })
      .addCase(getCostGroup.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {
  addRoute,
  updateRoute,
  removeRoute,
  updateStationInRoute,
  removeRouteByStation,
  updateTimeInRoute,
  updateCostInRoute,
  addTimeGroup,
  addCostGroup,
} = routesSlice.actions;
export default routesSlice.reducer;
