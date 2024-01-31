import React, { useEffect, useState } from "react";
import { getAllTickets } from "../../../store/requests/TicketsRequests";
import ReportParams from "./ReportParams";
import { useDispatch, useSelector } from "react-redux";
import { getDepartures } from "../../../store/requests/DeparturesRequests";
import { getSchedule } from "../../../store/requests/ScheduleRequests";
import {
  createCancelDeps,
  createSuccessfulDeps,
} from "../../../extraFunctions/generateExcel";

const ReportPage = () => {
  //ДАННЫЕ
  // запрашиваем данные из стора
  const departures = useSelector((state) => state.departures.departures);
  // const tickets = useSelector((state) => state.tickets.tickets);
  const schedule = useSelector((state) => state.schedule.schedule);
  console.log(departures);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (departures.length === 0) {
      dispatch(getDepartures());
    }
    if (schedule.length === 0) {
      dispatch(getSchedule());
    }
    // if (tickets.length === 0) {
    //   dispatch(getAllTickets());
    // }
    // console.log(departures, schedule, tickets);
  }, []);

  // ПОИСК И ФИЛЬТР
  // const [savedConfig, setSavedConfig] = useState({
  //   type: null,
  //   dates: { from: +new Date() - 2592000000, to: +new Date() },
  //   trips: [],
  // });

  const [downloadLink, setDownloadLink] = useState(null);

  const configHandler = (reportConfig) => {
    let dep_list = [];
    for (let dep of departures) {
      let type_ok = dep.status === reportConfig.type;
      let date_ok =
        reportConfig.dates.from <= dep.date &&
        dep.date <= reportConfig.dates.to;
      let trip_ok = reportConfig.trips.find((trip) => trip.id === dep.trip.id);
      trip_ok = reportConfig.trips.length === 0 ? true : trip_ok;
      // console.log(
      //   "type_ok ",
      //   type_ok,
      //   " date_ok ",
      //   date_ok,
      //   " trip_ok ",
      //   trip_ok
      // );
      // console.log(dep);
      // console.log(reportConfig);
      if (type_ok && date_ok && trip_ok) {
        dep_list.push(dep);
      }
    }

    console.log(dep_list);
    if (reportConfig.type === "done") {
      createSuccessfulDeps(dep_list).then((res) => {
        setDownloadLink(res);
      });
    } else {
      createCancelDeps(dep_list).then((res) => {
        setDownloadLink(res);
      });
    }
  };

  useEffect(() => {
    if (downloadLink) {
      document.getElementById("download-link").click();
    }
  }, [downloadLink]);
  console.log(downloadLink);
  return (
    <div className="page">
      <ReportParams createReport={configHandler} />
      {downloadLink && (
        <a
          id="download-link"
          style={{ display: "none" }}
          href={downloadLink}
          download="Отчет по рейсам.xlsx"
        ></a>
      )}
    </div>
  );
};

export default ReportPage;
