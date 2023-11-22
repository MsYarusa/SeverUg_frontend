import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getStations = createAsyncThunk(
  "schedule/getSchedule",
  async (_, { rejectWithValue }) => {
    // let data = [];
    // await axios
    //   .get("https://spacekot.ru/apishechka/schedule")
    //   .then((res) => {
    //     console.log("in GetSchedule, res:", res);
    //     data = res.data;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     return rejectWithValue(error.message)
    //   });

    let data = [
      {
        id: 1,
        name: "School",
      },
      {
        id: 2,
        name: "FEFU",
      },
      {
        id: 3,
        name: "STICK YOUR FINGER IN MY BACK_END",
      },
      {
        id: 4,
        name: "Death🤡",
      },
    ];

    return data;
  }
);
