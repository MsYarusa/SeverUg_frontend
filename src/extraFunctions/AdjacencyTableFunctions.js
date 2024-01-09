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
