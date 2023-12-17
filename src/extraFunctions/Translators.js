// РАБОТА С РОЛЯМИ
export const rolesRU = [
  "кассир",
  "менеджер",
  "дирекция",
  "сисадмин",
  "водитель",
];
export const rolesEN = ["cashier", "manager", "director", "admin", "driver"];

export function translateRole(role) {
  const rolesTranslator = [
    { english: "cashier", russian: "кассир" },
    { english: "manager", russian: "менеджер" },
    { english: "director", russian: "дирекция" },
    { english: "admin", russian: "сисадмин" },
    { english: "driver", russian: "водитель" },
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
// РАБОТА СО СТАТУСОМ АВТОБУСА
export const busStatusEN = ["active", "unactive"];
export const busStatusRU = ["активный", "на ремонте"];

export function translateBusStatus(status) {
  const statusTranslator = [
    { english: "active", russian: "активный" },
    { english: "unactive", russian: "на ремонте" },
  ];

  if (busStatusRU.find((statusRU) => statusRU === status)) {
    return statusTranslator.find((translator) => translator.russian === status)
      .english;
  }
  if (busStatusEN.find((statusEN) => statusEN === status)) {
    return statusTranslator.find((translator) => translator.english === status)
      .russian;
  }
}

//РАБОТА СО СТАТУСОМ ОТБЫТИЯ
export const depStatusEN = ["active", "canceled", "done"];
export const depStatusRU = ["активный", "отменен", "завершен"];

export function translateDepStatus(status) {
  const statusTranslator = [
    { english: "active", russian: "активный" },
    { english: "canceled", russian: "отменен" },
    { english: "done", russian: "завершен" },
  ];

  if (depStatusRU.find((statusRU) => statusRU === status)) {
    return statusTranslator.find((translator) => translator.russian === status)
      .english;
  }
  if (depStatusEN.find((statusEN) => statusEN === status)) {
    return statusTranslator.find((translator) => translator.english === status)
      .russian;
  }
}
