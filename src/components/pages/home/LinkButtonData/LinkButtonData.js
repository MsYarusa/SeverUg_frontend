import buses from "./buses.svg";
import employees from "./employees.svg";
import routes from "./routes.svg";
import schedule from "./schedule.svg";
import profit from "./profit.svg";
import successfulTrips from "./successfulTrips.svg";
import canceledTrips from "./canceledTrips.svg";
import tickets from "./tickets.svg";

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
    img: profit,
    text: "Прибыль",
    to: "/profit",
  },
  {
    img: canceledTrips,
    text: "Отмененные",
    to: "/canceled",
  },
  {
    img: successfulTrips,
    text: "Успешные",
    to: "/successful",
  },
  {
    img: tickets,
    text: "Билеты",
    to: "/tickets",
  },
];
