import { createSlice } from "@reduxjs/toolkit";
import { getAllTickets, getTicketsByDep } from "../requests/TicketsRequests";

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    allTickets: [],
    ticketsByDep: [],
    status: null,
    error: null,
  },
  reducers: {
    updateTicket(state, action) {
      state.ticketsByDep.forEach((item, i, arr) => {
        if (item.id === action.payload.id) {
          arr[i] = action.payload.ticket;
        }
      });
    },
    removeTicket(state, action) {
      state.ticketsByDep = state.ticketsByDep.filter(
        (ticket) => ticket.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.status = "resolved";
        state.allTickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getTicketsByDep.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTicketsByDep.fulfilled, (state, action) => {
        state.status = "resolved";
        state.ticketsByDep = action.payload;
      })
      .addCase(getTicketsByDep.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { updateTicket, removeTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;
