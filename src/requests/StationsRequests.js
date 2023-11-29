import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// тесты
import { stations } from "../tests/TestStations";

// ПОЛУЧЕНИЕ ВСЕХ СТАНЦИЙ
export const getStations = createAsyncThunk(
  "schedule/getStations",
  async (_, { rejectWithValue }) => {
    // отправление запроса
    let data = [];
    // await axios
    //   .get("https://spacekot.ru/apishechka/schedule/stations")
    //   .then((res) => {
    //     console.log(res.data.message);
    //     console.log(res.data.data);
    //     data = res.data.data;
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
