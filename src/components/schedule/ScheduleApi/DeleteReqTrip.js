import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Schedule from "./TestSchedule";

export const deleteReqTrip = async ({ id }) => {
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
  console.log(id);
  Schedule(null, null, id);
};
