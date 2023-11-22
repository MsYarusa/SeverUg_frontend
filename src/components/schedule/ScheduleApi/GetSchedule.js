import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Schedule from "./TestSchedule";

export const getSchedule = createAsyncThunk(
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

    let data = Schedule(null, true);

    for (let trip of data) {
      if (typeof trip.days === "string") {
        trip.days = trip.days.split(" ");
        trip.days.forEach((item, i, arr) => {
          arr[i] = Number(item);
        });
      }
    }

    return data;
  }
);
