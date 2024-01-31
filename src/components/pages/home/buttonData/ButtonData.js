import buses from "./buttonImgs/buses.svg";
import employees from "./buttonImgs/employees.svg";
import routes from "./buttonImgs/routes.svg";
import schedule from "./buttonImgs/schedule.svg";
import profit from "./buttonImgs/profit.svg";
import successfulTrips from "./buttonImgs/successfulTrips.svg";
import canceledTrips from "./buttonImgs/canceledTrips.svg";
import tickets from "./buttonImgs/tickets.svg";

export const admin_data = [
  {
    img: buses,
    text: "Автобусы",
    to: "/buses",
  },
  {
    img: employees,
    text: "Сотрудники",
    to: "/employees",
  },
  {
    img: routes,
    text: "Маршруты",
    to: "/routes",
  },
  {
    img: schedule,
    text: "Расписание",
    to: "/schedule",
  },
  {
    img: successfulTrips,
    text: "Отчеты",
    to: "/reports",
  },
  {
    img: tickets,
    text: "Билеты",
    to: "/tickets",
  },
];

export const director_data = [
  {
    img: successfulTrips,
    text: "Отчеты",
    to: "/reports",
  },
];
export const manager_data = [
  {
    img: buses,
    text: "Автобусы",
    to: "/buses",
  },
  {
    img: employees,
    text: "Сотрудники",
    to: "/employees",
  },
  {
    img: routes,
    text: "Маршруты",
    to: "/routes",
  },
  {
    img: schedule,
    text: "Расписание",
    to: "/schedule",
  },
];
