const Schedule = (postReq, getReq, deleteReq, putReq) => {
  if (getReq) {
    let save = JSON.parse(sessionStorage.getItem("schedule"));

    if (save) {
      schedule = save;
      return save;
    }
    return schedule;
  } else if (deleteReq) {
    console.log("im in here");
    let newSchedule = [];
    for (let trip of schedule) {
      if (trip.id !== deleteReq) {
        newSchedule.push(trip);
      }
    }

    schedule = [...newSchedule];
    sessionStorage.setItem("schedule", JSON.stringify(schedule));
    window.location.reload();
  } else if (postReq) {
    schedule = [...schedule, postReq];
    sessionStorage.setItem("schedule", JSON.stringify(schedule));
    window.location.reload();
  }
  return null;
};

export let schedule = [
  {
    id: 1,
    departure_time: "20:23",
    days: "4 5",
    driver: null,
    road: {
      id: 1,
      price: ["22", "23"],
      time: ["20", "23"],
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
          name: "Вертодром",
        },
      ],
      sort: "1 2 3",
    },
  },
];

export default Schedule;
