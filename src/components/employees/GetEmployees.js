import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (_, { rejectWithValue }) => {
    // let emps = [];
    // await axios
    //   .get("https://spacekot.ru/apishechka/schedule")
    //   .then((res) => {
    //     emps = res.emps;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     return rejectWithValue(error.message)
    //   });

    let emps = [
      {
        id: 1,
        first_name: "Abobus",
        last_name: "banfuciy",
        role: "directior",
      },
      {
        id: 2,
        first_name: "Ivan",
        last_name: "Petrov",
        role: "manager",
      },
      {
        id: 3,
        first_name: "Arslan",
        last_name: "Habadulov",
        role: "driver",
      },
      {
        id: 4,
        first_name: "Hazbik",
        last_name: "Nurmagamedov",
        role: "driver",
      },
      {
        id: 5,
        first_name: "Galina",
        last_name: "Otmena",
        role: "cashier",
      },
      {
        id: 6,
        first_name: "Anonimus",
        last_name: "Ivanov",
        role: "admin",
      },
      {
        id: 7,
        first_name: "Klara",
        last_name: "Budinovsky",
        role: "cashier",
      },
      {
        id: 8,
        first_name: "Vladimir",
        last_name: "Putin",
        role: "directior",
      },
      {
        id: 9,
        first_name: "Sultan",
        last_name: "Sidorov",
        role: "driver",
      },
    ];

    let rolesSet = new Set();

    for (let emp of emps) {
      rolesSet.add(emp.role);
    }

    let data = {
      roles: [...rolesSet],
      employees: emps,
    };

    return data;
  }
);
