import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import * as Sentry from "@sentry/browser";

// ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ
export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ login, password }, { rejectWithValue }) => {
    let data = null;

    // для тестирования на localhost
    // try {
    //   if (login === "abobus" && password === "abobus") {
    //     data = {
    //       token: "token",
    //       first_name: "Abobus",
    //       last_name: "banfuciy",
    //       role: "manager",
    //     };
    //   } else if (login === "russianBear" && password === "123") {
    //     data = {
    //       token: "token",
    //       first_name: "Vladimir",
    //       last_name: "Putin",
    //       role: "admin",
    //     };
    //   } else if (login === "galichka" && password === "123") {
    //     data = {
    //       token: "token",
    //       first_name: "Galina",
    //       last_name: "Otmena",
    //       role: "cashier",
    //     };
    //   } else if (login === "russianBear2" && password === "123") {
    //     data = {
    //       token: "token",
    //       first_name: "Dmitry",
    //       last_name: "Medvedev",
    //       role: "director",
    //     };
    //   } else {
    //     throw new Error("Wrong login or password!");
    //   }
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    // отправление запроса
    try {
      await axios
        .post("https://api.spacekot.ru/apishechka/login", {
          login: CryptoJS.SHA256(login).toString(CryptoJS.enc.Hex),
          password: CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex),
        })
        .then((res) => {
          console.log("статус: успешно");
          console.log("данные: ", res.data);
          data = res.data;
          if (data.role === "driver") {
            throw new Error("Wrong login or password!");
          }
        })
        .catch((error) => {
          Sentry.captureException(error);
          throw new Error(e.message);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
    return data;
  }
);
