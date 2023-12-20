import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTrip, updateTrip, removeTrip } from "../slicies/scheduleSlice";

// тесты
import { schedule } from "../../tests/TestData/TestSchedule";

// ПОЛУЧЕНИЕ ВСЕГО РАСПИСАНИЯ
export const getSchedule = createAsyncThunk(
  "schedule/getSchedule",
  async (_, { rejectWithValue }) => {
    //получение данных
    let data = [];
    try {
      await axios
        .get("https://spacekot.ru/apishechka/trip")
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          data = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // try {
    //   data = schedule;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    for (let trip of data) {
      trip.days.forEach((day, i, arr) => {
        day = day === 7 ? 0 : day;
        trip.days[i] = day;
      });
    }

    return data;
  }
);

// ДОБАВЛЕНИЕ РЕЙСА
export const postTrip = createAsyncThunk(
  "schedule/postTrip",
  async ({ trip }, { rejectWithValue, dispatch }) => {
    let newTrip = null;
    console.log(trip);

    //отправление запроса
    try {
      await axios
        .post("https://spacekot.ru/apishechka/trip", trip)
        .then((res) => {
          console.log("статус: успешно");
          newTrip = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    newTrip.days.forEach((day, i, arr) => {
      day = day === 7 ? 0 : day;
    });

    dispatch(addTrip({ trip: newTrip }));
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ РЕЙСА
export const putTrip = createAsyncThunk(
  "schedule/putTrip",
  async ({ id, trip }, { rejectWithValue, dispatch }) => {
    let newTrip = null;

    //отправление запроса
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/trip/${id}`, trip)
        .then((res) => {
          console.log("статус: успешно");
          newTrip = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    newTrip.days.forEach((day, i, arr) => {
      day = day === 7 ? 0 : day;
    });
    // обновление рейса в сторе
    dispatch(updateTrip({ id: id, trip: newTrip }));
  }
);

// УДАЛЕНИЕ РЕЙСА
export const deleteTrip = createAsyncThunk(
  "schedule/deleteTrip",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .delete(`https://spacekot.ru/apishechka/trip/${id}`)
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

    // удаление рейса из стора
    dispatch(removeTrip({ id: id }));
  }
);
