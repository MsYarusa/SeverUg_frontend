import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSchedule } from "../../../store/requests/ScheduleRequests";
import { getRoutes } from "../../../store/requests/RoutesRequests";
import { getBuses } from "../../../store/requests/BusesRequests";
import { getDrivers } from "../../../store/requests/EmployeesRequests";
import {
  getTimeFromMins,
  getMinsFromTime,
  sum,
} from "../../../extraFunctions/ExtraFunctions";
import { searchFromTo } from "../../../extraFunctions/SearchHandlers";

import ScheduleFilter from "./ScheduleFilterBeta";
import ScheduleList from "./ScheduleList";
import AddUpdateTrip from "./AddUpdateTrip";
import DeleteTrip from "./DeleteTrip";
import ObjectsPage from "../../cards/ObjectsPage";

const SchedulePage = () => {
  //ДАННЫЕ
  // запрашиваем данные из стора
  const schedule = useSelector((state) => state.schedule.schedule);
  const routes = useSelector((state) => state.routes.routes);
  const buses = useSelector((state) => state.buses.buses);
  const drivers = useSelector((state) => state.employees.drivers);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (routes.length === 0) {
      dispatch(getRoutes());
    }
    if (schedule.length === 0) {
      dispatch(getSchedule());
    }
    if (buses.length === 0) {
      dispatch(getBuses());
    }
    if (drivers.length === 0) {
      dispatch(getDrivers());
    }
  }, []);

  // ПОИСК И ФИЛЬТР
  // хранение отфильтрованного списка
  const [filteredList, setFilteredList] = useState(schedule);
  const [searchedList, setSearchedList] = useState(schedule);
  // сохранение параметров фильтра
  const [savedFilteredConfig, setSavedFilteredConfig] = useState({
    cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
    time: { from: 0, to: Number.MAX_SAFE_INTEGER },
    days: [],
  });
  const [savedSearchedConfig, setSavedSearchedConfig] = useState({
    from: "",
    to: "",
  });

  // задаем начальные значения отфильтрованных списков
  useEffect(() => {
    setFilteredList(schedule);
    setSearchedList(schedule);
    searchHandler(savedSearchedConfig);
  }, [schedule]);
  // после поиска необходимо отфильтровать список с учетом сохраненных параметров
  useEffect(() => {
    filterHandler(savedFilteredConfig);
  }, [searchedList]);

  // поиск (фильтрация по названию)
  const searchHandler = (searchConfig) => {
    let search_results = [];
    setSavedSearchedConfig(searchConfig);
    for (let trip of schedule) {
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
      search_results = [...search_results, ...newTrips];
    }

    setSearchedList(search_results);
  };

  // фильтр (фильтрация по характеристикам)
  const filterHandler = (filterConfig) => {
    let filter_results = [];
    setSavedFilteredConfig(filterConfig);
    for (let trip of searchedList) {
      let tripTotalCost = sum(trip.road.cost);
      let costOk =
        filterConfig.cost.from <= tripTotalCost &&
        tripTotalCost <= filterConfig.cost.to;

      let tripTotalTime = getMinsFromTime(trip.departure_time);
      let timeOk =
        filterConfig.time.from <= tripTotalTime &&
        tripTotalTime <= filterConfig.time.to;

      let dateOk = filterConfig.days.length === 0;

      for (let day of filterConfig.days) {
        dateOk = trip.days.indexOf(day) !== -1 || dateOk;
      }

      if (dateOk && timeOk && costOk) {
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

export default SchedulePage;
