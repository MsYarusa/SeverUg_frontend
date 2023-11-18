import axios from "axios";

const GetSchedule = async () => {
  // let data = [];
  // await axios
  //   .get("https://spacekot.ru/apishechka/schedule")
  //   .then((res) => {
  //     console.log("in GetSchedule, res:", res);
  //     data = res.data;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  let data = [
    {
      trip_id: 1,
      time_to: "every day",
      time_from: "never",
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
      time_to: "one",
      time_from: "three",
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
    if (trip.time_from !== "never") {
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
        trip_id: -trip.id,
        time_to: trip.time_from,
        time_from: trip.time_to,
        bus: trip.bus,
        stations: new_stations.reverse(),
      };

      return_trips.push(return_trip);
    }
  }

  data.push(...return_trips);
  console.log("in GetSchedule, data:", data);
  return data;
};

export default GetSchedule;
