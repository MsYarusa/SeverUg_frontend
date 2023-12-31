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
