import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Schedule from "./TestSchedule";

export const deleteReqTrip = async ({ id }) => {
  await axios
    .delete("https://spacekot.ru/apishechka/schedule/" + id.toString())
    .then((res) => {
      console.log(res.data.message);
      console.log(res.data.data);
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(id);
  // Schedule(null, null, id);
  window.location.reload();
};
