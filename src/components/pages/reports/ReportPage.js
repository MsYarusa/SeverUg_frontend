import React, { useEffect, useState } from "react";
import { getAllTickets } from "../../../store/requests/TicketsRequests";

const ReportPage = () => {
  //ДАННЫЕ
  // запрашиваем данные из стора
  const departures = useSelector((state) => state.departures.departures);
  const tickets = useSelector((state) => state.tickets.tickets);
  const schedule = useSelector((state) => state.schedule.schedule);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (departures.length === 0) {
      dispatch(getDepartures());
    }
    if (schedule.length === 0) {
      dispatch(getSchedule());
    }
    if (tickets.length === 0) {
      dispatch(getAllTickets());
    }
    console.log(departures, schedule, tickets);
  }, []);

  // РЕЖИМ (режим определяется что мы отрисовываем - отбытия или рейсы)
  // отбытия соответствующие данной дате
  // рейсы соответствующие данной дате
  // сменить режим можно установкой или сбросом даты
  const [dateSelected, setDateSelected] = useState(null);
  // список отбытий на определенную дату
  const [departuresForDate, setDeparturesForDate] = useState([]);

  const changeStateHandler = (date) => {
    if (date !== null) {
      let selectedDeps = [];
      for (let dep of departures) {
        // сравниваем даты в unix формате
        if (dep.date === +date) {
          selectedDeps.push(dep);
        }
      }

      let selectedTrips = [];
      let dateDay = date.getDay();
      for (let trip of schedule) {
        if (
          trip.days.indexOf(dateDay) !== -1 &&
          !selectedDeps.find((dep) => dep.trip.id === trip.id)
        ) {
          selectedTrips.push(trip);
        }
      }
      for (let trip of selectedTrips) {
        let accurateDate = new Date(+date);
        const [hours, mins] = trip.departure_time.split(":");
        accurateDate.setHours(Number(hours), Number(mins));
        selectedDeps.push({
          id: 0,
          date: +date,
          status:
            +accurateDate - 108000 >= +new Date()
              ? trip.bus.status === "active"
                ? "active"
                : "canceled"
              : "canceled",
          tickets: [],
          trip: trip,
        });
      }
      setDeparturesForDate(selectedDeps);
    }
    setDateSelected(date);
  };

  // ПОИСК И ФИЛЬТР
  // хранение отфильтрованного списка
  const [filteredList, setFilteredList] = useState(schedule);
  const [searchedList, setSearchedList] = useState(schedule);
  // сохранение параметров фильтра
  const [savedConfig, setSavedConfig] = useState({
    type: null,
    dates: { from: +new Date() - 2592000000, to: +new Date() },
    trips: [],
  });

  // задаем начальные значения отфильтрованных списков ( в зависимости от режимв)
  useEffect(() => {
    if (dateSelected) {
      changeStateHandler(dateSelected);
    } else {
      setFilteredList(schedule);
      setSearchedList(schedule);
    }
    searchHandler(savedSearchedConfig);
  }, [dateSelected, departures, schedule]);

  useEffect(() => {
    setFilteredList(departuresForDate);
    setSearchedList(departuresForDate);
  }, [departuresForDate]);

  // после поиска необходимо отфильтровать список с учетом сохраненных параметров
  useEffect(() => {
    filterHandler(savedFilteredConfig);
  }, [searchedList]);

  const configHandler = (reportConfig) => {};

  return (
    <div className="page">
      <ReportConfigs />
      <ReportTable />
    </div>
  );
};

export default ReportPage;
