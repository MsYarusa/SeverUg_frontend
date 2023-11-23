import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Schedule from "./TestSchedule";

export const postTrip = async ({ days, cost, time, stations }) => {
  let stationsId = [];
  for (let station of stations) {
    stationsId.push({ id: station.id });
  }

  await axios
    .post("https://spacekot.ru/apishechka/schedule", {
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

  // let newTrip = {
  //   id: 6,
  //   time_to: time,
  //   time_from: null,
  //   price: cost,
  //   days: days,
  //   stations: stations,
  //   driverDTO: null,
  // };

  // Schedule(newTrip);
};
