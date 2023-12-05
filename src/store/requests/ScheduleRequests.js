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
    // try {
    //   await axios
    //     .get("https://spacekot.ru/apishechka/trip")
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

    try {
      data = schedule;
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обработка массива дней недели
    for (let trip of data) {
      if (typeof trip.days === "string") {
        trip.days = trip.days.split(" ");
        trip.days.forEach((item, i, arr) => {
          arr[i] = Number(item);
        });
      }
    }
    // восстановление последовательности станций
    for (let trip of data) {
      trip.road.sort = trip.road.sort.split(" ");
      trip.road.sort.forEach((item, i, arr) => {
        arr[i] = Number(item);
      });
    }

    for (let trip of data) {
      let sortedStations = [];
      for (let i of trip.road.sort) {
        let station = trip.road.stations.find((station) => station.id === i);
        sortedStations.push(station);
      }
      trip.road.stations = sortedStations;
    }

    return data;
  }
);

// ДОБАВЛЕНИЕ РЕЙСА
export const postTrip = createAsyncThunk(
  "schedule/postTrip",
  async ({ days, time, road_id }, { rejectWithValue, dispatch }) => {
    let trip = null;

    //отправление запроса
    try {
      await axios
        .post("https://spacekot.ru/apishechka/trip", {
          departure_time: time,
          days: days,
          road_id: road_id,
        })
        .then((res) => {
          console.log("статус: успешно");
          trip = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обработка массива дней недели
    if (typeof trip.days === "string") {
      trip.days = trip.days.split(" ");
      trip.days.forEach((item, i, arr) => {
        arr[i] = Number(item);
      });
    }
    // восстановление последовательности станций
    trip.road.sort = trip.road.sort.split(" ");
    trip.road.sort.forEach((item, i, arr) => {
      arr[i] = Number(item);
    });

    let sortedStations = [];
    for (let i of trip.road.sort) {
      let station = trip.road.stations.find((station) => station.id === i);
      sortedStations.push(station);
    }
    trip.road.stations = sortedStations;

    // добавление рейса в стор
    dispatch(addTrip({ trip: trip }));
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ РЕЙСА
export const putTrip = createAsyncThunk(
  "schedule/putTrip",
  async ({ id, days, time, road_id }, { rejectWithValue, dispatch }) => {
    let trip = null;

    //отправление запроса
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/trip/${id}`, {
          departure_time: time,
          days: days,
          road_id: road_id,
        })
        .then((res) => {
          console.log("статус: успешно");
          trip = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обработка массива дней недели
    if (typeof trip.days === "string") {
      trip.days = trip.days.split(" ");
      trip.days.forEach((item, i, arr) => {
        arr[i] = Number(item);
      });
    }
    // восстановление последовательности станций
    trip.road.sort = trip.road.sort.split(" ");
    trip.road.sort.forEach((item, i, arr) => {
      arr[i] = Number(item);
    });

    let sortedStations = [];
    for (let i of trip.road.sort) {
      let station = trip.road.stations.find((station) => station.id === i);
      sortedStations.push(station);
    }
    trip.road.stations = sortedStations;

    // обновление рейса в сторе
    dispatch(updateTrip({ id: id, trip: trip }));
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
