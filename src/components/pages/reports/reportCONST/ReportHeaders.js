const PROFIT_HEADER = [
  "№ ПОЕЗДКИ",
  "№ РЕЙСА",
  "ДАТА",
  "КОЛ-ВО ПРОДАННЫХ БИЛЕТОВ",
  "КОЛ_ВО НЕПРОДАННЫХ БИЛЕТОВ",
  "ЦЕНА БИЛЕТА",
  "ПРИБЫЛЬ ЗА ПОЕЗДКУ",
];
const SUCCESSFUL_HEADER = [
  "№ ПОЕЗДКИ",
  "№ РЕЙСА",
  "ДАТА",
  "ВРЕМЯ НАЧАЛА",
  "ВРЕМЯ КОНЦА",
  "ВОДИТЕЛЬ",
  "АВТОБУС",
];
const CANCELED_HEADER = [
  "№ ПОЕЗДКИ",
  "№ РЕЙСА",
  "ДАТА",
  "ЗАПЛАНИРОВАННОЕ ВРЕМЯ НАЧАЛА",
  "ПРИЧИНА ОТМЕНЫ",
  "ВОДИТЕЛЬ",
  "АВТОБУС",
];
const TYPES_DICT = {
  profit: PROFIT_HEADER,
  succes: SUCCESSFUL_HEADER,
  cancel: CANCELED_HEADER,
};