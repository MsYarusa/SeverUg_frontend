import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ
export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ login, password }, { rejectWithValue }) => {
    let data = null;

    // для тестирования на localhost
    try {
      if (login === "abobus" && password === "abobus") {
        data = {
          token: "token",
          first_name: "Abobus",
          last_name: "banfuciy",
          role: "directior",
        };
      } else {
        throw new Error("Wrong login or password!");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // отправление запроса
    // try {
    //   await axios
    //     .post("https://spacekot.ru/apishechka/login", {
    //       login: login,
    //       password: password,
    //     })
    //     .then((res) => {
    //       console.log("статус: успешно");
    //       console.log("данные: ", res.data);
    //       data = res.data;
    //     })
    //     .catch((error) => {
    //       throw new Error("Wrong login or password!");
    //     });
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }
    return data;
  }
);
