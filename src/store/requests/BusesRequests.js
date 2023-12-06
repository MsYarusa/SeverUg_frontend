import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBus, updateBus, removeBus } from "../slicies/busesSlice";

// тесты
import { buses } from "../../tests/TestData/TestBuses";

// ПОЛУЧЕНИЕ ВСЕХ АВТОБУСОВ
export const getBuses = createAsyncThunk(
  "buses/getBuses",
  async (_, { rejectWithValue }) => {
    // получение данных
    let data = { buses: [], models: [] };
    try {
      await axios
        .get("https://spacekot.ru/apishechka/buses")
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          data.buses = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error("Server Error!");
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // try {
    //   data.buses = buses;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    // получаем множество всех ролей
    data.models = ["HONDA", "boobabus"];

    return data;
  }
);

// ДОБАВЛЕНИЕ АВТОБУСА
export const postBus = createAsyncThunk(
  "buses/postBus",
  async ({ bus }, { rejectWithValue, dispatch }) => {
    let newBus = null;
    //отправление запроса
    try {
      await axios
        .post("https://spacekot.ru/apishechka/buses", bus)
        .then((res) => {
          console.log("статус: успешно");
          newBus = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // добавление автобуса в стор
    dispatch(addBus({ bus: newBus }));
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ АВТОБУСА
export const putBus = createAsyncThunk(
  "buses/putBus",
  async ({ id, bus }, { rejectWithValue, dispatch }) => {
    let newBus = null;
    //отправление запроса
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/buses/${id}`, bus)
        .then((res) => {
          console.log("статус: успешно");
          newBus = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обновление автобуса в сторе
    dispatch(updateBus({ id: id, bus: newBus }));
  }
);

// УДАЛЕНИЕ АВТОБУСА
export const deleteBus = createAsyncThunk(
  "buses/deleteBus",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .delete(`https://spacekot.ru/apishechka/buses/${id}`)
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

    // удаление автобоса из стора
    dispatch(removeBus({ id: id }));
  }
);
