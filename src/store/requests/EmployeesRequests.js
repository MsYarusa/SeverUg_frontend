import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addEmployee,
  updateEmployee,
  removeEmployee,
  addDriver,
  updateDriver,
  removeDriver,
} from "../slicies/employeesSlice";

// тесты
import { employees, drivers } from "../../tests/TestData/TestEmployees";

// ПОЛУЧЕНИЕ ВСЕХ СОТРУДНИКОВ
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (_, { rejectWithValue }) => {
    // получение данных
    let data = [];
    // try {
    //   await axios
    //     .get("https://spacekot.ru/apishechka/user")
    //     .then((res) => {
    //       console.log("статус: успешно");
    //       console.log("данные: ", res.data);
    //       data = res.data;
    //     })
    //     .catch((error) => {
    //       console.error("ошибка: ", error.message);
    //       throw new Error("Server Error!");
    //     });
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    try {
      data = employees;
    } catch (error) {
      return rejectWithValue(error.message);
    }

    return data;
  }
);

// ДОБАВЛЕНИЕ СОТРУДНИКА
export const postEmployee = createAsyncThunk(
  "employees/postEmployee",
  async ({ employee }, { rejectWithValue, dispatch }) => {
    let newEmployee = null;
    //отправление запроса
    try {
      await axios
        .post("https://spacekot.ru/apishechka/user", employee)
        .then((res) => {
          console.log("статус: успешно");
          newEmployee = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // добавление сотрудника в стор
    dispatch(addEmployee({ employee: newEmployee }));
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ СОТРУДНИКА
export const putEmployee = createAsyncThunk(
  "employees/putEmployee",
  async ({ id, employee }, { rejectWithValue, dispatch }) => {
    let newEmployee = null;
    //отправление запроса
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/user/${id}`, employee)
        .then((res) => {
          console.log("статус: успешно");
          newEmployee = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обновление сотрудника в сторе
    dispatch(updateEmployee({ id: id, employee: newEmployee }));
  }
);

// УДАЛЕНИЕ СОТРУДНИКА
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .delete(`https://spacekot.ru/apishechka/user/${id}`)
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

    // удаление сотрудника из стора
    dispatch(removeEmployee({ id: id }));
  }
);

// ПОЛУЧЕНИЕ ВСЕХ ВОДИТЕЛЕЙ
export const getDrivers = createAsyncThunk(
  "employees/getDrivers",
  async (_, { rejectWithValue }) => {
    // получение данных
    let data = [];
    // try {
    //   await axios
    //     .get("https://spacekot.ru/apishechka/driver")
    //     .then((res) => {
    //       console.log("статус: успешно");
    //       console.log("данные: ", res.data);
    //       data = res.data;
    //     })
    //     .catch((error) => {
    //       console.error("ошибка: ", error.message);
    //       throw new Error("Server Error!");
    //     });
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    try {
      data = drivers;
    } catch (error) {
      return rejectWithValue(error.message);
    }

    return data;
  }
);

// ДОБАВЛЕНИЕ СОТРУДНИКА
export const postDriver = createAsyncThunk(
  "employees/postDriver",
  async ({ driver }, { rejectWithValue, dispatch }) => {
    let newDriver = null;
    //отправление запроса
    try {
      await axios
        .post("https://spacekot.ru/apishechka/driver", driver)
        .then((res) => {
          console.log("статус: успешно");
          newDriver = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // добавление сотрудника в стор
    dispatch(addDriver({ driver: newDriver }));
  }
);

// ИЗМЕНЕНИЯ ДАННЫХ СОТРУДНИКА
export const putDriver = createAsyncThunk(
  "employees/putDriver",
  async ({ id, driver }, { rejectWithValue, dispatch }) => {
    let newDriver = null;
    //отправление запроса
    try {
      await axios
        .put(`https://spacekot.ru/apishechka/driver/${id}`, driver)
        .then((res) => {
          console.log("статус: успешно");
          newDriver = res.data;
        })
        .catch((error) => {
          console.error("ошибка: ", error.message);
          throw new Error(error.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // обновление сотрудника в сторе
    dispatch(updateDriver({ id: id, driver: newDriver }));
  }
);

// УДАЛЕНИЕ СОТРУДНИКА
export const deleteDriver = createAsyncThunk(
  "employees/deleteDriver",
  async ({ id }, { rejectWithValue, dispatch }) => {
    //отправление запроса
    try {
      await axios
        .delete(`https://spacekot.ru/apishechka/driver/${id}`)
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

    // удаление сотрудника из стора
    dispatch(removeDriver({ id: id }));
  }
);
