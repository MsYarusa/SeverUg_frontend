import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ login, password }, { rejectWithValue }) => {
    let data = null;

    // try {
    //   if (login === "abobus" && password === "SJhDjh98ksdjkSDKJ-SKDJK") {
    //     data = {
    //       token: "token",
    //       first_name: "Abobus",
    //       last_name: "banfuciy",
    //       role: "directior",
    //     };
    //   } else {
    //     throw new Error("Wrong login or password!");
    //   }
    // } catch (error) {
    //   return rejectWithValue(error.message);
    // }

    await axios
      .post("https://spacekot.ru/apishechka/login", {
        login: login,
        password: password,
      })
      .then((res) => {
        data = res.data.data;
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        return rejectWithValue(error.message);
      });

    return data;
  }
);
