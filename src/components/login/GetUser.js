import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ login, password }, { rejectWithValue }) => {
    let data = null;

    // console.log("login, password", login, password);

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

    // await axios
    //   .post("https://spacekot.ru/apishechka/login", {
    //     login: login,
    //     password: password,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     data = res.data
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     return rejectWithValue(error.message);
    // });

    return data;
  }
);
