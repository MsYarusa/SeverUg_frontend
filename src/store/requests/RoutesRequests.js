import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRoute,
  updateRoute,
  removeRoute,
  addTimeGroup,
  addCostGroup,
  updateTimeInRoute,
  updateCostInRoute,
} from "../slicies/routesSlice";
import { updateRouteInTrip, removeTripByRoute } from "../slicies/scheduleSlice";
import { addToTable } from "../../extraFunctions/ExtraFunctions";

// тесты
import {
  routes,
  timeGroups,
  costGroups,
} from "../../tests/TestData/TestRoutes";

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

    return data;
  }
);

// ДОБАВЛЕНИЕ МАРШРУТА
export const postRoute = createAsyncThunk(
  "routes/postRoute",
  async ({ route }, { rejectWithValue, dispatch }) => {
    let newRroute = null;
    //отправление запроса
    try {
      await axios
        .post("https://spacekot.ru/apishechka/road", route)
        .then((res) => {
          console.log("статус: успешно");
          newRroute = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // добавление маршрута в стор
    dispatch(addRoute({ route: newRroute }));
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ МАРШРУТА
export const putRoute = createAsyncThunk(
  "routes/putRoute",
  async ({ id, route }, { rejectWithValue, dispatch }) => {
    let newRoute = null;
    //отправление запроса
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/road/${id}`, route)
        .then((res) => {
          console.log("статус: успешно");
          newRoute = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обновление маршрута в сторе
    dispatch(updateRoute({ id: id, route: newRoute }));
    dispatch(updateRouteInTrip({ id: id, route: newRoute }));
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
    dispatch(removeTripByRoute({ id: id }));
  }
);

// ПОЛУЧЕНИЕ ГРУПП ВРЕМЕНИ
export const getTimeGroup = createAsyncThunk(
  "routes/getTimeGroup",
  async (_, { rejectWithValue }) => {
    let data = [];
    // try {
    //   await axios
    //     .get(`https://spacekot.ru/apishechka/station_time`)
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
      data = timeGroups;
    } catch (error) {
      return rejectWithValue(error.message);
    }

    let timeTable = [];
    // преобразования списка групп
    for (let timeGroup of data) {
      let station1 = timeGroup.station_1;
      let station2 = timeGroup.station_2;
      let value = timeGroup.time;
      addToTable(timeTable, station1, station2, value);
    }

    return timeTable;
  }
);

// ДОБАВЛЕНИЕ ГРУППЫ ВРЕМЕНИ
export const postTimeGroup = createAsyncThunk(
  "routes/postTimeGroup",
  async ({ time }, { rejectWithValue, dispatch }) => {
    let data = [];
    if (time.length === 1) {
      time = time[0];
    }
    try {
      await axios
        .post(
          `https://spacekot.ru/apishechka/station_time${
            time.length === 1 ? "" : "/few"
          }`,
          time
        )
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
    // отправляем запросы на изменение стора
    for (let timeGroup of data) {
      dispatch(updateTimeInRoute({ timeGroup: timeGroup }));
      dispatch(addTimeGroup({ timeGroup: timeGroup }));
    }
  }
);

// ИЗМЕНЕНИЕ ГРУППЫ ВРЕМЕНИ
export const putTimeGroup = createAsyncThunk(
  "routes/putTimeGroup",
  async ({ time }, { rejectWithValue, dispatch }) => {
    let data = [];
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/station_time`, time)
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
    dispatch(updateTimeInRoute({ timeGroup: data }));
    dispatch(addTimeGroup({ timeGroup: data }));
  }
);

// ПОЛУЧЕНИЕ ГРУПП СТОИМОСТИ
export const getCostGroup = createAsyncThunk(
  "routes/getCostGroup",
  async (_, { rejectWithValue }) => {
    let data = [];
    try {
      await axios
        .get(`https://spacekot.ru/apishechka/station_cost`)
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
    //   data = costGroups;
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    let costTable = [];
    // преобразования списка групп
    for (let costGroup of data) {
      let station1 = costGroup.station_1;
      let station2 = costGroup.station_2;
      let value = costGroup.cost;
      addToTable(costTable, station1, station2, value);
    }

    return costTable;
  }
);

// ДОБАВЛЕНИЕ ГРУППЫ СТОИМОСТИ
export const postCostGroup = createAsyncThunk(
  "routes/postCostGroup",
  async ({ cost }, { rejectWithValue, dispatch }) => {
    let data = [];
    if (cost.length === 1) {
      cost = cost[0];
    }
    try {
      await axios
        .post(
          `https://spacekot.ru/apishechka/station_cost${
            cost.length === 1 ? "" : "/few"
          }`,
          cost
        )
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

    // отправляем запросы на изменение стора
    for (let costGroup of data) {
      dispatch(updateCostInRoute({ costGroup: costGroup }));
      dispatch(addCostGroup({ costGroup: costGroup }));
    }
  }
);

// ИЗМЕНЕНИЕ ГРУППЫ СТОИМОСТИ
export const putCostGroup = createAsyncThunk(
  "routes/putCostGroup",
  async ({ cost }, { rejectWithValue, dispatch }) => {
    let data = [];
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/station_cost`, cost)
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

    dispatch(updateCostInRoute({ costGroup: data }));
    dispatch(addCostGroup({ costGroup: data }));
  }
);
