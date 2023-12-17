export function sum(array) {
  let totalPrice = 0;
  array?.forEach((item, i, arr) => {
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

// РАБОТА С ГРУППАМИ ВРЕМЕНИ И СТОИМОСТИ
export function addToTable(table, station1, station2, value) {
  if (table[station1]) {
    table[station1][station2] = value;
  } else {
    let valueList = [];
    valueList[station2] = value;
    table[station1] = valueList;
  }
}

export function getFromTable(table, station1, station2) {
  if (table[station1] && table[station1][station2]) {
    return table[station1][station2];
  } else {
    return null;
  }
}
