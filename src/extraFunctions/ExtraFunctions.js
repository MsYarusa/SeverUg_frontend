export function sum(array) {
  let totalPrice = 0;
  array.forEach((item, i, arr) => {
    totalPrice += Number(item);
  });
  return totalPrice;
}
// РАБОТА С ДАТАМИ
export function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
}

export function getMinsFromTime(time) {
  const [hours, minutes] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}
// РАБОТА С РОЛЯМИ
export const rolesRU = [
  "Кассир",
  "Менеджер",
  "Дирекция",
  "Сисадмин",
  "Водитель",
];
export const rolesEN = ["cashier", "manager", "director", "admin", "driver"];

export function translateRole(role) {
  const rolesTranslator = [
    { english: "cashier", russian: "Кассир" },
    { english: "manager", russian: "Менеджер" },
    { english: "director", russian: "Дирекция" },
    { english: "admin", russian: "Сисадмин" },
    { english: "driver", russian: "Водитель" },
  ];

  if (rolesRU.find((roleRU) => roleRU === role)) {
    return rolesTranslator.find((translator) => translator.russian === role)
      .english;
  }
  if (rolesEN.find((roleEN) => roleEN === role)) {
    return rolesTranslator.find((translator) => translator.english === role)
      .russian;
  }
}
