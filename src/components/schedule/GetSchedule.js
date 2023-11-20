import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

    let data = [
      {
        trip_id: 1,
        date: "01.11.2023",
        time_to: "11:30",
        time_from: "15:40",
        cost: 549,
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
        bus: {
          id: 1,
          model: "boobabus",
          status: "active",
        },
      },
      {
        trip_id: 2,
        date: "02.11.2023",
        time_to: "12:00",
        time_from: "16:30",
        cost: 499,
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
        bus: {
          id: 1,
          model: "boobabus",
          status: "active",
        },
      },
    ];

    let return_trips = [];

    for (let trip of data) {
      if (trip.time_from !== null) {
        let new_stations = [];

        for (let elem of trip.stations) {
          let new_elem_id = elem.id;
          let new_elem_name = elem.name;
          let new_elem = {
            id: new_elem_id,
            name: new_elem_name,
          };
          new_stations.push(new_elem);
        }

        let return_trip = {
          trip_id: -trip.trip_id,
          date: trip.date,
          time_to: trip.time_from,
          time_from: null,
          cost: trip.cost,
          bus: trip.bus,
          stations: new_stations.reverse(),
        };

        return_trips.push(return_trip);
      }
    }

    data.push(...return_trips);
    console.log("in GetSchedule, data:", data);
    return data;
  }
);
