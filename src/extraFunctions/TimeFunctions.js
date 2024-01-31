// РАБОТА СО ВРЕМЕНЕМ
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
// РАБОТА С ДАТАМИ
export function transferDateToString(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return year + "-" + month + "-" + day;
}
