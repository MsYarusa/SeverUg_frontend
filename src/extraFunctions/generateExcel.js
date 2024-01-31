import { Workbook } from "exceljs";
import {
  SUCCESSFUL_HEADER,
  CANCELED_HEADER,
} from "../components/pages/reports/reportCONST/ReportHeaders";
import {
  getMinsFromTime,
  getTimeFromMins,
  transferDateToString,
} from "./TimeFunctions";
import { sum } from "./BaseFunctions";

export async function createSuccessfulDeps(deps) {
  const successfulDeps = new Workbook();
  successfulDeps.Title = "Завершенные рейсы";

  const sheet = successfulDeps.addWorksheet();

  sheet.columns = [
    { header: SUCCESSFUL_HEADER[0], key: "numDep" },
    { header: SUCCESSFUL_HEADER[1], key: "numTrip" },
    { header: SUCCESSFUL_HEADER[2], key: "date" },
    { header: SUCCESSFUL_HEADER[3], key: "timeStart" },
    { header: SUCCESSFUL_HEADER[4], key: "timeEnd" },
    { header: SUCCESSFUL_HEADER[5], key: "driver" },
    { header: SUCCESSFUL_HEADER[6], key: "bus" },
    { header: SUCCESSFUL_HEADER[7], key: "tickets_count" },
    { header: SUCCESSFUL_HEADER[8], key: "cost" },
    { header: SUCCESSFUL_HEADER[9], key: "revenue" },
  ];
  deps.forEach((c) => {
    let rowValue = [];
    rowValue.push(`№ ${c.id}`);
    rowValue.push(
      `№ ${c.trip.id} ${c.trip.road.stations.at(0).name} - ${
        c.trip.road.stations.at(-1).name
      }`
    );
    rowValue.push(transferDateToString(new Date(c.date)));
    rowValue.push(c.trip.departure_time);
    rowValue.push(
      getTimeFromMins(
        getMinsFromTime(c.trip.departure_time) + sum(c.trip.road.time) > 24 * 60
          ? getMinsFromTime(c.trip.departure_time) +
              sum(c.trip.road.time) -
              24 * 60
          : getMinsFromTime(c.trip.departure_time) + sum(c.trip.road.time)
      )
    );
    rowValue.push(c.trip.driver.last_name + " " + c.trip.driver.first_name);
    rowValue.push(
      c.trip.bus.model +
        " " +
        c.trip.bus.code +
        " - " +
        c.trip.bus.number_of_sits +
        " мест."
    );
    rowValue.push(c.tickets.length);
    rowValue.push(sum(c.trip.road.cost) + " руб.");
    rowValue.push(`${c.tickets.length * sum(c.trip.road.cost)} руб.`);
    sheet.addRow(rowValue);
  });
  const bytes = await successfulDeps.xlsx.writeBuffer();
  const data = new Blob([bytes], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return URL.createObjectURL(data);
}

export async function createCancelDeps(deps) {
  const canceledDeps = new Workbook();
  canceledDeps.Title = "Отмененные рейсы";

  const sheet = canceledDeps.addWorksheet();

  sheet.columns = [
    { header: CANCELED_HEADER[0], key: "numDep" },
    { header: CANCELED_HEADER[1], key: "numTrip" },
    { header: CANCELED_HEADER[2], key: "date" },
    { header: CANCELED_HEADER[3], key: "timeStart" },
    { header: CANCELED_HEADER[4], key: "driver" },
    { header: CANCELED_HEADER[5], key: "bus" },
  ];
  deps.forEach((c) => {
    let rowValue = [];
    rowValue.push(`№ ${c.id}`);
    rowValue.push(
      `№ ${c.trip.id} ${c.trip.road.stations.at(0).name} - ${
        c.trip.road.stations.at(-1).name
      }`
    );
    rowValue.push(transferDateToString(new Date(c.date)));
    rowValue.push(c.trip.departure_time);
    rowValue.push(c.trip.driver.last_name + " " + c.trip.driver.first_name);
    rowValue.push(
      c.trip.bus.model +
        " " +
        c.trip.bus.code +
        " - " +
        c.trip.bus.number_of_sits +
        " мест."
    );
    sheet.addRow(rowValue);
  });
  const bytes = await canceledDeps.xlsx.writeBuffer();
  const data = new Blob([bytes], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return URL.createObjectURL(data);
}
