import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDeparture,
  updateDeparture,
  removeDeparture,
} from "../slicies/departuresSlice";

// тесты
import { departures, ticketsTest } from "../../tests/TestData/TestDepartures";

// ПОЛУЧЕНИЕ ВСЕХ ОТБЫТИЙ
export const getDepartures = createAsyncThunk(
  "departures/getDepartures",
  async (_, { rejectWithValue }) => {
    // отправление запроса
    let data = [];
    // try {
    //   await axios
    //     .get("https://spacekot.ru/apishechka/departures")
    //     .then((res) => {
    //       console.log("статус: успешно");
    //       console.log("данные: ", res.data);
    //       data = res.data;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       throw new Error(error.message);
    //     });
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    try {
      data = departures;
    } catch (error) {
      return rejectWithValue(error.message);
    }

    return data;
  }
);

// ДОБАВЛЕНИЕ ОТБЫТИЯ
export const postDepartures = createAsyncThunk(
  "departures/postDepartures",
  async ({ departure }, { rejectWithValue, dispatch }) => {
    let newDeparture = null;
    //отправление запроса
    try {
      await axios
        .post("https://spacekot.ru/apishechka/departures", departure)
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          newDeparture = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // добавление отбытия в стор
    dispatch(addDeparture({ departure: newDeparture }));
  }
);

// ДОБАВЛЕНИЕ БИЛЕТОВ
export const postTicket = createAsyncThunk(
  "departures/postTicket",
  async ({ tickets }, { rejectWithValue, dispatch }) => {
    let data = [];
    // try {
    //   await axios
    //     .post(
    //       `https://spacekot.ru/apishechka/tickets${
    //         tickets.length === 1 ? "" : "/few"
    //       }`,
    //       tickets.length === 1 ? tickets[0] : tickets
    //     )
    //     .then((res) => {
    //       console.log("статус: успешно");
    //       console.log("данные: ", res.data);
    //       data = res.data;
    //     })
    //     .catch((error) => {
    //       console.error("ошибка: ", error.message);
    //       throw new Error(error.message);
    //     });
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    // // отправляем запрос на получение новых отбытий
    // setTimeout(dispatch, 1000, getDepartures());

    try {
      data = ticketsTest;
    } catch (error) {
      return rejectWithValue(error.message);
    }

    return data;
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ ОТБЫТИЯ
export const putDeparture = createAsyncThunk(
  "departures/putDeparture",
  async ({ id, departure }, { rejectWithValue, dispatch }) => {
    let newDeparture = null;
    //отправление запроса
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/departures/${id}`, departure)
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          newDeparture = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обновление отбытия в сторе
    dispatch(updateDeparture({ id: id, departure: newDeparture }));
  }
);

// УДАЛЕНИЕ СТАНЦИИ
export const deleteDeparture = createAsyncThunk(
  "departures/deleteDeparture",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .delete(`https://spacekot.ru/apishechka/departures/${id}`)
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

    // удаление станции из стора
    dispatch(removeDeparture({ id: id }));
  }
);
