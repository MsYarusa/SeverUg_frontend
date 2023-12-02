import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoutes } from "../../../requests/RoutesRequests";
import { getStations } from "../../../requests/StationsRequests";
import { getSchedule } from "../../../requests/ScheduleRequests";

import RoutesList from "./RoutesList";
import RouteFilter from "./RouteFilter";
import AddRoute from "./AddRoute";
import UpdateRoute from "./UpdateRoute";
import DeleteRoute from "./DeleteRoute";
import "../../cards/objectStyles/ObjectPage.css";

let savedFilteredConfig = {
  cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
  time: { from: 0, to: Number.MAX_SAFE_INTEGER },
  days: [],
};

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
  const [filteredList, setFilteredList] = useState(routes);
  const [searchedList, setSearchedList] = useState(routes);

  // задаем начальные значения отфильтрованных списков
  useEffect(() => {
    setFilteredList(routes);
    setSearchedList(routes);
  }, [routes]);

  useEffect(() => {
    filterHandler(savedFilteredConfig);
  }, [searchedList]);

  // поиск
  const searchHandler = (searchConfig) => {
    let search_results = [];
    for (let route of routes) {
      let from =
        searchConfig.from === ""
          ? route.stations.at(0).name.toLowerCase()
          : searchConfig.from;
      let to =
        searchConfig.to === ""
          ? route.stations.at(-1).name.toLowerCase()
          : searchConfig.to;

      // проверяем на совпадение с начальными станциями
      let fromRoutes = [];
      route.stations.slice(0, -1).forEach((item, i, arr) => {
        let routeFrom = item.name.toLowerCase();
        let searchedFrom = routeFrom.indexOf(from);
        if (searchedFrom === 0) {
          let newRoute = {
            id: route.id + " from" + item.name,
            price: route.price.slice(i),
            time: route.time.slice(i),
            stations: route.stations.slice(i),
          };
          fromRoutes.push(newRoute);
        }
      });

      // проверяем на совпадение с конечными станциями
      let newRoutes = [];
      for (let fromRoute of fromRoutes) {
        fromRoute.stations?.slice(1).forEach((item, i, arr) => {
          let routeTo = item.name.toLowerCase();
          let searchedTo = routeTo.indexOf(to);
          if (searchedTo === 0) {
            let newRoute = {
              id: fromRoute.id + "to" + item.name,
              price: fromRoute.price.slice(0, i + 1),
              time: fromRoute.time.slice(0, i + 1),
              stations: fromRoute.stations.slice(0, i + 2),
            };
            newRoutes.push(newRoute);
          }
        });
      }
      // сохраняем подходящие результаты
      search_results = [...search_results, ...newRoutes];
    }
    setSearchedList(search_results);
  };

  // фильтр
  const filterHandler = (filterConfig) => {
    let filter_results = [];
    savedFilteredConfig = filterConfig;
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
    console.log(filter_results);
    setFilteredList(filter_results);
  };

  // РАБОТА С ИНФОРМАЦИЕЙ (ОКНА)
  // хранение информации об окнах
  const [addRoute, setAddRoute] = useState(false);
  const [updateRoute, setUpdateRoute] = useState(false);
  const [deleteRoute, setDeleteRoute] = useState(false);
  const [deleteRouteById, setDeleteRouteById] = useState(-1);
  const [updateRouteById, setUpdateRouteById] = useState(null);

  //ОТКРЫТИЕ ОКОН
  // открытие окна добавления
  const addRouteHandler = () => {
    setAddRoute(true);
  };

  // открытие окна обновления
  const updateRouteHandler = (id) => {
    let route = routes.find((route) => route.id === id);
    setUpdateRouteById(route);
    setUpdateRoute(true);
  };

  // открытие окна удаления
  const deleteRouteHandler = (id) => {
    setDeleteRouteById(id);
    setDeleteRoute(true);
  };

  //ЗАКРЫТИЕ ОКОН
  // закрытие окна добавления
  const cancelAddHandler = () => {
    setAddRoute(false);
  };

  // закрытие окна обновления
  const cancelUpdateHandler = () => {
    setUpdateRoute(false);
  };

  // закрытие окна удаления
  const cancelDeleteHandler = () => {
    setDeleteRoute(false);
  };

  return (
    <div className="page">
      <RouteFilter onFilter={filterHandler} />
      <RoutesList
        searchHandler={searchHandler}
        buttonsHandlers={{
          add: addRouteHandler,
          update: updateRouteHandler,
          delete: deleteRouteHandler,
        }}
        list={filteredList}
      />
      {addRoute && <AddRoute cancelHandler={cancelAddHandler} />}
      {updateRoute && (
        <UpdateRoute
          cancelHandler={cancelUpdateHandler}
          route={updateRouteById}
        />
      )}
      {deleteRoute && (
        <DeleteRoute cancelHandler={cancelDeleteHandler} id={deleteRouteById} />
      )}
    </div>
  );
};

export default RoutesPage;
