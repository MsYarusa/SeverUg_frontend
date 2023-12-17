import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSchedule } from "../../../store/requests/ScheduleRequests";
import { getDepartures } from "../../../store/requests/DeparturesRequests";
import {
  getTimeFromMins,
  getMinsFromTime,
  sum,
} from "../../../extraFunctions/ExtraFunctions";
import { searchFromTo } from "../../../extraFunctions/SearchHandlers";

import DepartureFilter from "../routes/RouteFilterBeta";
import DeparturesList from "./DeparturesList";
import BuyWindow from "./BuyWindow";

const TicketPage = () => {
  //ДАННЫЕ
  // запрашиваем данные из стора
  const departures = useSelector((state) => state.departures.departures);
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
        selectedDeps.push({
          id: 0,
          date: +date,
          status:
            +date >= +new Date()
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
  const [savedFilteredConfig, setSavedFilteredConfig] = useState({
    cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
    time: { from: 0, to: Number.MAX_SAFE_INTEGER },
  });
  const [savedSearchedConfig, setSavedSearchedConfig] = useState({
    from: "",
    to: "",
  });

  // задаем начальные значения отфильтрованных списков ( в зависимости от режимв)
  useEffect(() => {
    if (dateSelected) {
      setFilteredList(departuresForDate);
      setSearchedList(departuresForDate);
    } else {
      setFilteredList(schedule);
      setSearchedList(schedule);
    }
    searchHandler(savedSearchedConfig);
  }, [dateSelected, departures, schedule]);

  // после поиска необходимо отфильтровать список с учетом сохраненных параметров
  useEffect(() => {
    filterHandler(savedFilteredConfig);
  }, [searchedList]);

  // поиск (фильтрация по названию)
  const searchHandler = (searchConfig) => {
    let searchResults = [];
    setSavedSearchedConfig(searchConfig);
    for (let item of dateSelected ? departuresForDate : schedule) {
      let trip = dateSelected ? item.trip : item;
      let searchData = searchFromTo({
        route: trip.road,
        searchConfig: searchConfig,
      });
      let newRoutes = searchData.routes;
      let departureTime = searchData.departureTime;
      let newTrips = [];
      newRoutes.forEach((item, i, arr) => {
        newTrips.push({
          id: trip.id,
          departure_time: getTimeFromMins(
            departureTime[i] + getMinsFromTime(trip.departure_time)
          ),
          days: trip.days,
          driver: trip.driver,
          bus: trip.bus,
          road: item,
        });
      });

      if (dateSelected) {
        newTrips.forEach((dep, i, arr) => {
          arr[i] = {
            id: item.id,
            date: item.date,
            status: item.status,
            tickets: item.tickets,
            trip: dep,
          };
        });
      }

      searchResults = [...searchResults, ...newTrips];
    }
    setSearchedList(searchResults);
  };

  // фильтр (фильтрация по характеристикам)
  const filterHandler = (filterConfig) => {
    let filterResults = [];
    setSavedFilteredConfig(filterConfig);
    for (let item of searchedList) {
      let trip = dateSelected ? item.trip : item;
      let tripTotalPrice = sum(trip.road.cost);
      let costOk =
        filterConfig.cost.from <= tripTotalPrice &&
        tripTotalPrice <= filterConfig.cost.to;
      let tripTotalTime = getMinsFromTime(trip.departure_time);
      let timeOk =
        filterConfig.time.from <= tripTotalTime &&
        tripTotalTime <= filterConfig.time.to;
      if (timeOk && costOk) {
        filterResults.push(item);
      }
    }
    if (dateSelected) {
      filterResults.sort((a, b) =>
        getMinsFromTime(a.trip.departure_time) <
        getMinsFromTime(b.trip.departure_time)
          ? 1
          : -1
      );
    } else {
      filterResults.sort((a, b) =>
        getMinsFromTime(a.departure_time) < getMinsFromTime(b.departure_time)
          ? 1
          : -1
      );
    }
    setFilteredList(filterResults);
  };

  // УПРАВЛЕНИЕ ОКНОВ ОФОРМЛЕНИЯ БИЛЕТОВ
  const [buyWindowOpened, setBuyWindowOpened] = useState(false);
  const [depToBuy, setDepToBuy] = useState(null);

  const buyHandler = (data) => {
    setDepToBuy(data);
    setBuyWindowOpened(true);
  };

  const cancelBuy = () => {
    setBuyWindowOpened(false);
  };

  return (
    <div className="page">
      <DepartureFilter onFilter={filterHandler} isSmall={false} />
      <DeparturesList
        searchHandler={searchHandler}
        filterHandler={filterHandler}
        buyHandler={buyHandler}
        changeState={changeStateHandler}
        list={filteredList}
      />
      {buyWindowOpened && (
        <BuyWindow cancelHandler={cancelBuy} data={depToBuy} />
      )}
    </div>
  );
};

export default TicketPage;
