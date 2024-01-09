import axios from "axios";
import * as Sentry from "@sentry/browser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBus,
  updateBus,
  removeBus,
  addDriverToBus,
} from "../slicies/busesSlice";
import { addBusToDriver, removeBusInDriver } from "../slicies/employeesSlice";
import { updateBusInTrip, removeTripByBus } from "../slicies/scheduleSlice";

// тесты
import { buses, models } from "../../tests/TestData/TestBuses";

// ПОЛУЧЕНИЕ ВСЕХ АВТОБУСОВ
export const getBuses = createAsyncThunk(
  "buses/getBuses",
  async (_, { rejectWithValue }) => {
    // получение данных
    let data = [];
    try {
      await axios
        .get("https://api.spacekot.ru/apishechka/buses")
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          data = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          Sentry.captureException(error);
          throw new Error("Server Error!");
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // try {
    //   data = buses;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    return data;
  }
);

// ПОЛУЧЕНИЕ МОДЕЛЕЙ АВТОБУСОВ
export const getModels = createAsyncThunk(
  "buses/getModels",
  async (_, { rejectWithValue }) => {
    // получение данных
    let data = [];
    try {
      await axios
        .get("https://api.spacekot.ru/apishechka/bus_spec")
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          data = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          Sentry.captureException(error);
          throw new Error("Server Error!");
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // try {
    //   data = models;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

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
        .post("https://api.spacekot.ru/apishechka/buses", bus)
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          newBus = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          Sentry.captureException(error);
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
        .put(`https://api.spacekot.ru/apishechka/buses/${id}`, bus)
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          newBus = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          Sentry.captureException(error);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обновление автобуса в сторе
    dispatch(updateBus({ id: id, bus: newBus }));
    dispatch(updateBusInTrip({ id: id, bus: newBus }));
  }
);

// УДАЛЕНИЕ АВТОБУСА
export const deleteBus = createAsyncThunk(
  "buses/deleteBus",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .delete(`https://api.spacekot.ru/apishechka/buses/${id}`)
        .then((res) => {
          console.log("статус: успешно");
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          Sentry.captureException(error);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // удаление автобоса из стора
    dispatch(removeBus({ id: id }));
    dispatch(removeBusInDriver({ id: id }));
    dispatch(removeTripByBus({ id: id }));
  }
);

// ДОБАВЛЕНИЕ ВОДИТЕЛЯ
export const patchBus = createAsyncThunk(
  "buses/patchBus",
  async ({ bus_id, driver_id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .patch(
          `https://api.spacekot.ru/apishechka/driver?bus_id=${bus_id}&driver_id=${driver_id}`
        )
        .then((res) => {
          console.log("статус: успешно");
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          Sentry.captureException(error);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // связывание автобуса и водителя в сторе
    dispatch(addBusToDriver({ bus_id: bus_id, driver_id: driver_id }));
    dispatch(addDriverToBus({ bus_id: bus_id, driver_id: driver_id }));
  }
);
