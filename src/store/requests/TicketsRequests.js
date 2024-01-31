import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateTicket, removeTicket } from "../slicies/ticketsSlice";
import { getDepartures } from "./DeparturesRequests";

// тесты
import { departures, ticketsTest } from "../../tests/TestData/TestDepartures";

// ПОЛУЧЕНИЕ ВСЕХ БИЛЕТОВ
export const getAllTickets = createAsyncThunk(
  "tickets/getAllTickets",
  async (_, { rejectWithValue }) => {
    // отправление запроса
    let data = [];
    try {
      await axios
        .get("https://api.spacekot.ru/apishechka/tickets")
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          data = res.data;
        })
        .catch((error) => {
          console.error(error);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // try {
    //   data = ticketsTest;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    return data;
  }
);

// ПОЛУЧЕНИЕ БИЛЕТОВ ПО ОТБЫТИЯМ
export const getTicketsByDep = createAsyncThunk(
  "tickets/getTicketsByDep",
  async ({ dep_id }, { rejectWithValue }) => {
    // отправление запроса
    let data = [];
    try {
      await axios
        .get(
          `https://api.spacekot.ru/apishechka/tickets/get_by_departure/${dep_id}`
        )
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          data = res.data;
        })
        .catch((error) => {
          console.error(error);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // try {
    //   data = departures.find((departure)=>departure.id === dep_id).tickets;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    return data;
  }
);

// ДОБАВЛЕНИЕ БИЛЕТОВ
export const postTicket = createAsyncThunk(
  "departures/postTicket",
  async ({ tickets }, { rejectWithValue, dispatch }) => {
    let data = [];
    try {
      await axios
        .post(
          `https://api.spacekot.ru/apishechka/tickets${
            tickets.length === 1 ? "" : "/few"
          }`,
          tickets.length === 1 ? tickets[0] : tickets
        )
        .then((res) => {
          console.log("статус: успешно");
          console.log("билеты: ", res.data);
          data = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // // отправляем запрос на получение новых отбытий
    setTimeout(dispatch, 1000, getDepartures());

    // try {
    //   data = ticketsTest;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    return Array.isArray(data) ? data : [data];
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ БИЛЕТА
export const putTicket = createAsyncThunk(
  "tickets/putTicket",
  async ({ id, ticket }, { rejectWithValue, dispatch }) => {
    let newTicket = null;
    //отправление запроса
    try {
      await axios
        .put(`https://api.spacekot.ru/apishechka/tickets/${id}`, ticket)
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          newTicket = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обновление билета в сторе
    dispatch(updateTicket({ id: id, ticket: newTicket }));
  }
);

// УДАЛЕНИЕ БИЛЕТА
export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .delete(`https://api.spacekot.ru/apishechka/tickets/${id}`)
        .then((res) => {
          console.log("статус: успешно");
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // удаление билета из стора
    dispatch(removeTicket({ id: id }));
  }
);
