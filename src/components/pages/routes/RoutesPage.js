import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoutes } from "../../../store/requests/RoutesRequests";
import { getStations } from "../../../store/requests/StationsRequests";
import { getSchedule } from "../../../store/requests/ScheduleRequests";
import { searchFromTo } from "../../../extraFunctions/SearchHandlers";

import RoutesList from "./RoutesList";
import RouteFilter from "./RouteFilter";
import AddUpdateRoute from "./AddUpdateRoute";
import DeleteRoute from "./DeleteRoute";
import ObjectsPage from "../../cards/ObjectsPage";

const RoutesPage = () => {
  //ДАННЫЕ
  // запрашиваем данные из стора
  const routes = useSelector((state) => state.routes.routes);
  const stations = useSelector((state) => state.stations.stations);
  const schedule = useSelector((state) => state.schedule.schedule);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (routes.length === 0) {
      dispatch(getRoutes());
    }
    if (stations.length === 0) {
      dispatch(getStations());
    }
    if (schedule.length === 0) {
      dispatch(getSchedule());
    }
  }, []);

  // ПОИСК И ФИЛЬТР
  // хранение отфильтрованного списка
  const [searchedList, setSearchedList] = useState(routes);
  const [filteredList, setFilteredList] = useState(routes);
  // сохранение параметров фильтра
  const [savedFilteredConfig, setSavedFilteredConfig] = useState({
    cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
    time: { from: 0, to: Number.MAX_SAFE_INTEGER },
    days: [],
  });

  // задаем начальные значения отфильтрованных списков
  useEffect(() => {
    setFilteredList(routes);
    setSearchedList(routes);
  }, [routes]);

  // после поиска необходимо отфильтровать список с учетом сохраненных параметров
  useEffect(() => {
    filterHandler(savedFilteredConfig);
  }, [searchedList]);

  // поиск (фильтрация по названию)
  const searchHandler = (searchConfig) => {
    let search_results = [];
    for (let route of routes) {
      search_results = [
        ...search_results,
        ...searchFromTo({ route: route, searchConfig: searchConfig }).routes,
      ];
    }
    setSearchedList(search_results);
  };

  // фильтр (фильтрация по характеристикам)
  const filterHandler = (filterConfig) => {
    let filter_results = [];
    setSavedFilteredConfig(filterConfig);
    for (let route of searchedList) {
      let totalPrice = 0;
      route.price.forEach((item, i, arr) => {
        totalPrice += Number(item);
      });

      let totalTime = 0;
      route.time.forEach((item, i, arr) => {
        totalTime += Number(item);
      });

      let costOk =
        filterConfig.cost.from <= totalPrice &&
        totalPrice <= filterConfig.cost.to;

      let timeOk =
        filterConfig.time.from <= totalTime &&
        totalTime <= filterConfig.time.to;

      if (timeOk && costOk) {
        filter_results.push(route);
      }
    }
    setFilteredList(filter_results);
  };

  return (
    <ObjectsPage
      AddUpdateObject={AddUpdateRoute}
      DeleteObject={DeleteRoute}
      ObjectFilter={RouteFilter}
      ObjectsList={RoutesList}
      filterHandler={filterHandler}
      searchHandler={searchHandler}
      list={filteredList}
      objects={routes}
    />
  );
};

export default RoutesPage;
