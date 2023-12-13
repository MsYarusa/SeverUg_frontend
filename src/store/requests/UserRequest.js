import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SHA256 } from "crypto-js";

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
          role: "manager",
        };
      } else if (login === "russianBear" && password === "123") {
        data = {
          token: "token",
          first_name: "Vladimir",
          last_name: "Putin",
          role: "admin",
        };
      } else if (login === "galichka" && password === "123") {
        data = {
          token: "token",
          first_name: "Galina",
          last_name: "Otmena",
          role: "cashier",
        };
      } else if (login === "russianBear2" && password === "123") {
        data = {
          token: "token",
          first_name: "Dmitry",
          last_name: "Medvedev",
          role: "director",
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
    //       password: SHA256(password),
    //     })
    //     .then((res) => {
    //       console.log("статус: успешно");
    //       console.log("данные: ", res.data);
    //       data = res.data;
    //       if (data.role === "driver") {
    //         throw new Error("Wrong login or password!");
    //       }
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
