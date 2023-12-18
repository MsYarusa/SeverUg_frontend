import { createSlice } from "@reduxjs/toolkit";
import { getDepartures, postTicket } from "../requests/DeparturesRequests";

const departureSlice = createSlice({
  name: "departures",
  initialState: {
    tickets: [],
    departures: [],
    status: null,
    error: null,
  },
  reducers: {
    addDeparture(state, action) {
      state.departures.push(action.payload.departure);
    },
    updateDeparture(state, action) {
      state.departures.forEach((item, i, arr) => {
        if (item.id === action.payload.id) {
          arr[i] = action.payload.departure;
        }
      });
    },
    removeDeparture(state, action) {
      state.departures = state.departures.filter(
        (departure) => departure.id !== action.payload.id
      );
    },
    updateTripInDeparture(state, action) {
      state.departures.forEach((item, i, arr) => {
        if (item.trip.id === action.payload.id) {
          arr[i].trip = action.payload.trip;
        }
      });
    },
    clearTickets(state, action) {
      state.tickets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartures.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDepartures.fulfilled, (state, action) => {
        state.status = "resolved";
        state.departures = action.payload;
      })
      .addCase(getDepartures.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(postTicket.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postTicket.fulfilled, (state, action) => {
        state.status = "resolved";
        state.tickets = action.payload;
      })
      .addCase(postTicket.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {
  addDeparture,
  updateDeparture,
  updateTripInDeparture,
  removeDeparture,
  clearTickets,
} = departureSlice.actions;
export default departureSlice.reducer;
