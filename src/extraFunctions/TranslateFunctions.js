import {
  rolesEN,
  rolesRU,
  busStatusEN,
  busStatusRU,
  depStatusEN,
  depStatusRU,
  reportsTypeEN,
  reportsTypeRU,
} from "./CONSTs/TranslatorCONSTS";

// РАБОТА С РОЛЯМИ
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

//РАБОТА С ТИПАМИ ОТЧЕТОВ
export function translateReportType(type) {
  const typeTranslator = [
    { english: "profit", russian: "отчет по прибыли" },
    { english: "cancel", russian: "отчет по отмененным рейсам" },
    { english: "succes", russian: "отчет по завершенным рейсы" },
  ];

  if (reportsTypeRU.find((typeRU) => typeRU === type)) {
    return typeTranslator.find((translator) => translator.russian === type)
      .english;
  }
  if (reportsTypeEN.find((typeEN) => typeEN === type)) {
    return typeTranslator.find((translator) => translator.english === type)
      .russian;
  }
}
