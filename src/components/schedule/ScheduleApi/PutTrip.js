import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Schedule from "./TestSchedule";

export const putTrip = async ({ id, days, cost, time, stations }) => {
  let stationsId = [];
  for (let station of stations) {
    stationsId.push({ id: station.id });
  }
  await axios
    .put("https://spacekot.ru/apishechka/schedule/" + id.toString(), {
      driver_id: null,
      time_to: time,
      time_from: null,
      price: cost,
      days: days,
      stations: stationsId,
    })
    .then((res) => {
      console.log(res.data.message);
      console.log(res.data.data);
    })
    .catch((error) => {
      console.error(error);
    });
  window.location.reload();
};
