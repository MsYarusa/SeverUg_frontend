import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Schedule from "./TestSchedule";

export const postTrip = async ({ days, cost, time, stations }) => {
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

  let newTrip = {
    id: 6,
    time_to: time,
    time_from: null,
    price: cost,
    days: days,
    stations: stations,
    driverDTO: null,
  };

  Schedule(newTrip);
};
