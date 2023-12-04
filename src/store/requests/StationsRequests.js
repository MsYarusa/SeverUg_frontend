import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addStation,
  updateStation,
  removeStation,
} from "../slicies/stationsSlice";

// тесты
import { stations } from "../../tests/TestStations";

// ПОЛУЧЕНИЕ ВСЕХ СТАНЦИЙ
export const getStations = createAsyncThunk(
  "stations/getStations",
  async (_, { rejectWithValue }) => {
    // отправление запроса
    let data = [];
    // await axios
    //   .get("https://spacekot.ru/apishechka/stations")
    //   .then((res) => {
    //     console.log("статус: успешно");
    //     data = res.data;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     return rejectWithValue(error.message);
    //   });

    try {
      data = stations;
    } catch (error) {
      return rejectWithValue(error.message);
    }

    return data;
  }
);

// ДОБАВЛЕНИЕ СТАНЦИИ
export const postStation = createAsyncThunk(
  "stations/postStation",
  async ({ name }, { rejectWithValue, dispatch }) => {
    let station = null;
    //отправление запроса
    await axios
      .post("https://spacekot.ru/apishechka/stations", {
        name: name,
      })
      .then((res) => {
        console.log("статус: успешно");
        station = res.data;
      })
      .catch((error) => {
        console.error("ошибка: ", error.message);
        return rejectWithValue(error.message);
      });

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
    await axios
      .put(`https://spacekot.ru/apishechka/stations/${id}`, {
        name: name,
      })
      .then((res) => {
        console.log("статус: успешно");
        station = res.data;
      })
      .catch((error) => {
        console.error("ошибка: ", error.message);
        return rejectWithValue(error.message);
      });

    // обновление станции в сторе
    dispatch(updateStation({ id: id, station: station }));
  }
);

// УДАЛЕНИЕ СТАНЦИИ
export const deleteStation = createAsyncThunk(
  "stations/deleteStation",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    await axios
      .delete(`https://spacekot.ru/apishechka/stations/${id}`)
      .then((res) => {
        console.log("статус: успешно");
      })
      .catch((error) => {
        console.error("ошибка: ", error.message);
        return rejectWithValue(error.message);
      });

    // удаление станции из стора
    dispatch(removeStation({ id: id }));
  }
);
