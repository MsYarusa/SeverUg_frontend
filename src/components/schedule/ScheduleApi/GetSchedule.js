import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSchedule = createAsyncThunk(
  "schedule/getStations",
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
        time_to: "11:30",
        time_from: null,
        price: 666.0,
        days: "1 2 3 4 5 6 0",
        stations: [
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
            name: "Death🤡",
          },
        ],
        driverDTO: null,
      },
      {
        id: 2,

        time_to: "11:30",
        time_from: null,
        price: 549,
        days: "1 2 3 4 5",
        stations: [
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
        ],
        driverDTO: null,
      },
      {
        trip_id: 3,

        time_to: "15:40",
        time_from: null,
        price: 549,
        days: "1 2 3 4 5",
        stations: [
          {
            id: 3,
            name: "STICK YOUR FINGER IN MY BACK_END",
          },
          {
            id: 2,
            name: "FEFU",
          },
          {
            id: 1,
            name: "School",
          },
        ],
        driverDTO: null,
      },
      {
        id: 4,
        time_to: "12:00",
        time_from: null,
        price: 499,
        days: "6 0",
        stations: [
          {
            id: 1,
            name: "School",
          },
          {
            id: 3,
            name: "STICK YOUR FINGER IN MY BACK_END",
          },
        ],
        driverDTO: null,
      },
      {
        id: 5,
        time_to: "16:30",
        time_from: null,
        price: 499,
        days: "6 0",
        stations: [
          {
            id: 3,
            name: "STICK YOUR FINGER IN MY BACK_END",
          },
          {
            id: 1,
            name: "School",
          },
        ],
        driverDTO: null,
      },
    ];

    for (let trip of data) {
      trip.days = trip.days.split(" ");
      trip.days.forEach((item, i, arr) => {
        arr[i] = Number(item);
      });
    }

    return data;
  }
);
