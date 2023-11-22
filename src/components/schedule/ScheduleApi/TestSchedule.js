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

let schedule = [
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
    id: 3,

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

export default Schedule;
