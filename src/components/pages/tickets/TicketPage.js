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

import DepartureFilter from "./RouteFilterBeta";
import DeparturesList from "./DeparturesList";

const ticketsPage = () => {
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
  // сменить режим можно установкой или сбросом даты
  const [dateSelected, setDateSelected] = useState(false);

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
      setFilteredList(departures);
      setSearchedList(departures);
    } else {
      setFilteredList(schedule);
      setSearchedList(schedule);
    }
    searchHandler(savedSearchedConfig);
  }, [dateSelected]);

  // после поиска необходимо отфильтровать список с учетом сохраненных параметров
  useEffect(() => {
    filterHandler(savedFilteredConfig);
  }, [searchedList]);

  // поиск (фильтрация по названию)
  const searchHandler = (searchConfig) => {
    let search_results = [];
    setSavedSearchedConfig(searchConfig);
    for (let trip of dateSelected ? departures : schedule) {
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
          road: item,
        });
      });
      search_results = [...search_results, ...newTrips];
    }

    setSearchedList(search_results);
  };

  // фильтр (фильтрация по характеристикам)
  const filterHandler = (filterConfig) => {
    let filter_results = [];
    setSavedFilteredConfig(filterConfig);
    for (let trip of searchedList) {
      let tripTotalPrice = sum(trip.road.price);
      let costOk =
        filterConfig.cost.from <= tripTotalPrice &&
        tripTotalPrice <= filterConfig.cost.to;

      let tripTotalTime = getMinsFromTime(trip.departure_time);
      let timeOk =
        filterConfig.time.from <= tripTotalTime &&
        tripTotalTime <= filterConfig.time.to;

      if (timeOk && costOk) {
        filter_results.push(trip);
      }
    }

    setFilteredList(filter_results);
  };

  return (
    <ObjectsPage
      AddUpdateObject={AddUpdateTrip}
      DeleteObject={DeleteTrip}
      ObjectFilter={ScheduleFilter}
      ObjectsList={ScheduleList}
      filterHandler={filterHandler}
      searchHandler={searchHandler}
      list={filteredList}
      objects={schedule}
    />
  );
};

export default ticketsPage;
