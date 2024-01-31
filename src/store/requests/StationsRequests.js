import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addStation,
  updateStation,
  removeStation,
} from "../slicies/stationsSlice";
import {
  updateStationInRoute,
  removeRouteByStation,
} from "../slicies/routesSlice";
import {
  updateStationInTrip,
  removeTripByStation,
} from "../slicies/scheduleSlice";

// тесты
import { stations } from "../../tests/TestData/TestStations";

// ПОЛУЧЕНИЕ ВСЕХ СТАНЦИЙ
export const getStations = createAsyncThunk(
  "stations/getStations",
  async (_, { rejectWithValue }) => {
    // отправление запроса
    let data = [];
    try {
      await axios
        .get("https://api.spacekot.ru/apishechka/stations")
        .then((res) => {
          console.log("статус: успешно");
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
    //   data = stations;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    return data;
  }
);

// ДОБАВЛЕНИЕ СТАНЦИИ
export const postStation = createAsyncThunk(
  "stations/postStation",
  async ({ name }, { rejectWithValue, dispatch }) => {
    let station = null;
    //отправление запроса
    try {
      await axios
        .post("https://api.spacekot.ru/apishechka/stations", {
          name: name,
        })
        .then((res) => {
          console.log("статус: успешно");
          station = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // добавление станции в стор
    dispatch(addStation({ station: station }));
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ СТАНЦИИ
export const putStation = createAsyncThunk(
  "stations/putStation",
  async ({ id, name }, { rejectWithValue, dispatch }) => {
    let station = null;
    //отправление запроса
    try {
      await axios
        .put(`https://api.spacekot.ru/apishechka/stations/${id}`, {
          name: name,
        })
        .then((res) => {
          console.log("статус: успешно");
          station = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обновление станции в сторе
    dispatch(updateStation({ id: id, station: station }));
    dispatch(updateStationInRoute({ id: id, name: name }));
    dispatch(updateStationInTrip({ id: id, name: name }));
  }
);

// УДАЛЕНИЕ СТАНЦИИ
export const deleteStation = createAsyncThunk(
  "stations/deleteStation",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .delete(`https://api.spacekot.ru/apishechka/stations/${id}`)
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
    dispatch(removeStation({ id: id }));
    dispatch(removeRouteByStation({ id: id }));
    dispatch(removeTripByStation({ id: id }));
  }
);
