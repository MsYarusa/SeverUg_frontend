import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoutes } from "../../../requests/RoutesRequests";
import { getStations } from "../../../requests/StationsRequests";

import RoutesList from "./RoutesList";
import RouteFilter from "./RouteFilter";
import AddRoute from "./AddRoute";
import UpdateRoute from "./UpdateRoute";
import DeleteRoute from "./DeleteRoute";

let savedSearchedConfig = { from: "", to: "" };

const RoutesPage = () => {
  // запрашиваем данные из стора
  const routes = useSelector((state) => state.routes.routes);
  const stations = useSelector((state) => state.stations.stations);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (routes.length === 0) {
      dispatch(getRoutes());
    }
    if (stations.length === 0) {
      dispatch(getStations());
    }
  }, []);

  // хранение отфильтрованного списка
  const [filteredList, setFilteredList] = useState(routes);
  const [searchedList, setSearchedList] = useState(routes);

  // задаем начальные значения отфильтрованных списков
  useEffect(() => {
    setFilteredList(routes);
    setSearchedList(routes);
  }, [routes]);

  useEffect(() => {
    searchHandler(savedSearchedConfig);
  }, [filteredList]);

  // хранение информации об окнах
  const [addRoute, setAddRoute] = useState(false);
  const [updateRoute, setUpdateRoute] = useState(false);
  const [deleteRoute, setDeleteRoute] = useState(false);
  const [deleteRouteById, setDeleteRouteById] = useState(-1);
  const [updateRouteById, setUpdateRouteById] = useState(null);

  // поиск
  const searchHandler = (searchConfig) => {
    let search_results = [];
    savedSearchedConfig = searchConfig;
    for (let route of filteredList) {
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
    for (let route of routes) {
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
        list={searchedList}
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
