export const schedule = [
  {
    id: 1,
    departure_time: "15:11",
    days: [1, 2, 7],
    driver: {
      token: null,
      id: 1,
      first_name: "Дмитрий",
      last_name: "Пузырь",
      father_name: "Михалыч",
      email: null,
      phone_number: null,
      role: "driver",
      driver_id: "1234",
      bus_id: 1,
    },
    bus: {
      id: 1,
      drive_id: 1,
      model: "b_1",
      code: "H123OK",
      status: "active",
      number_of_sits: 12,
    },
    road: {
      id: 1,
      cost: [21],
      time: [6],
      stations: [
        {
          id: 2,
          name: "FEFU",
        },
        {
          id: 1,
          name: "School",
        },
      ],
    },
  },
];
