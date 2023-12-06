import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addRoute, updateRoute, removeRoute } from "../slicies/routesSlice";

// тесты
import { routes } from "../../tests/TestData/TestRoutes";

// ПОЛУЧЕНИЕ ВСЕХ МАРШРУТОВ
export const getRoutes = createAsyncThunk(
  "routes/getRoutes",
  async (_, { rejectWithValue }) => {
    // получение данных
    let data = [];
    try {
      await axios
        .get("https://spacekot.ru/apishechka/road")
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
    //   data = routes;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    // восстанавливаем последовательность станций
    for (let route of data) {
      route.sort = route.sort.split(" ");
      route.sort.forEach((item, i, arr) => {
        arr[i] = Number(item);
      });
    }

    for (let route of data) {
      let sortedStations = [];
      for (let i of route.sort) {
        let station = route.stations.find((station) => station.id === i);
        sortedStations.push(station);
      }
      route.stations = sortedStations;
    }

    return data;
  }
);

// ДОБАВЛЕНИЕ МАРШРУТА
export const postRoute = createAsyncThunk(
  "routes/postRoute",
  async ({ price, time, sort, stations_id }, { rejectWithValue, dispatch }) => {
    let route = null;
    //отправление запроса
    try {
      await axios
        .post("https://spacekot.ru/apishechka/road", {
          price: price,
          time: time,
          sort: sort,
          stations_id: stations_id,
        })
        .then((res) => {
          console.log("статус: успешно");
          route = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // добавление маршрута в стор
    dispatch(addRoute({ route: route }));
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ МАРШРУТА
export const putRoute = createAsyncThunk(
  "routes/putRoute",
  async (
    { id, price, time, sort, stations_id },
    { rejectWithValue, dispatch }
  ) => {
    let route = null;
    //отправление запроса
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/road/${id}`, {
          price: price,
          time: time,
          sort: sort,
          stations_id: stations_id,
        })
        .then((res) => {
          console.log("статус: успешно");
          route = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обновление маршрута в сторе
    dispatch(updateRoute({ id: id, route: route }));
  }
);

// УДАЛЕНИЕ МАРШРУТА
export const deleteRoute = createAsyncThunk(
  "routes/deleteRoute",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .delete(`https://spacekot.ru/apishechka/road/${id}`)
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

    // удаление маршрута из стора
    dispatch(removeRoute({ id: id }));
  }
);
