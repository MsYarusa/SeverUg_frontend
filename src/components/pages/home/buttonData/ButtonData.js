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
