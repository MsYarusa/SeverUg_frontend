export const routes = [
  {
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
  {
    id: 2,
    cost: [21, 40, 20],
    time: [6, 10, 5],
    stations: [
      {
        id: 2,
        name: "FEFU",
      },
      {
        id: 3,
        name: "Park",
      },
      {
        id: 4,
        name: "Port",
      },
      {
        id: 1,
        name: "School",
      },
    ],
  },
  {
    id: 3,
    cost: [21],
    time: [6],
    stations: [
      {
        id: 1,
        name: "School",
      },
      {
        id: 2,
        name: "FEFU",
      },
    ],
  },
];

export const test1Expected = {
  routes: [
    {
      id: "1 fromFEFUtoSchool",
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
  ],
  departureTime: [0],
};

export const test2Expected = {
  routes: [
    {
      id: "2 fromParktoSchool",
      cost: [40, 20],
      time: [10, 5],
      stations: [
        {
          id: 3,
          name: "Park",
        },
        {
          id: 4,
          name: "Port",
        },
        {
          id: 1,
          name: "School",
        },
      ],
    },
    {
      id: "2 fromPorttoSchool",
      cost: [20],
      time: [5],
      stations: [
        {
          id: 4,
          name: "Port",
        },
        {
          id: 1,
          name: "School",
        },
      ],
    },
  ],
  departureTime: [6, 16],
};

export const test3Expected = {
  routes: [
    {
      id: "2 fromParktoPort",
      cost: [40],
      time: [10],
      stations: [
        {
          id: 3,
          name: "Park",
        },
        {
          id: 4,
          name: "Port",
        },
      ],
    },
  ],
  departureTime: [6],
};

export const timeGroups = [
  {
    station_1: 1,
    station_2: 2,
    time: 5,
  },
  {
    station_1: 2,
    station_2: 1,
    time: 6,
  },
];

export const costGroups = [
  {
    station_1: 1,
    station_2: 2,
    cost: 20,
  },
  {
    station_1: 2,
    station_2: 1,
    cost: 21,
  },
];
