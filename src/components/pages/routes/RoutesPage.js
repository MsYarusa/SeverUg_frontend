import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoutes } from "../../../requests/RoutesRequests";
import { getStations } from "../../../requests/StationsRequests";

import RoutesList from "./RoutesList";
import RouteFilter from "./RouteFilter";

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
    setSearchedList(filteredList);
  }, [filteredList]);

  // хранение информации об окнах
  const [addRoute, setAddRoute] = useState(false);
  const [updateRoute, setUpdateRoute] = useState(false);
  const [deleteRoute, setDeleteRoute] = useState(false);
  const [deleteRouteById, setDeleteRouteById] = useState(-1);
  const [updateRouteById, setUpdateRouteById] = useState(null);

  // поиск
  const searchHandler = (searchConfig) => {
    // let search_results = [];
    // for (let trip of filteredList) {
    //   let tripFrom = trip.stations.at(0).name.toLowerCase();
    //   let tripTo = trip.stations.at(-1).name.toLowerCase();
    //   let searchedFrom = tripFrom.indexOf(searchConfig.from);
    //   let searchedTo = tripTo.indexOf(searchConfig.to);
    //   if (searchedFrom === 0 && searchedTo === 0) {
    //     search_results.push(trip);
    //   }
    // }
    // setSearchedList(search_results);
  };

  // фильтр
  const filterHandler = (filterConfig) => {
    // console.log(filterConfig);
    // let filter_results = [];
    // for (let trip of schedule) {
    //   let costOk =
    //     filterConfig.cost.from <= trip.price &&
    //     trip.price <= filterConfig.cost.to;
    //   let [hours, mins] = trip.time_to.split(":");
    //   let time = Number(hours) + Number(mins) / 100;
    //   let timeOk =
    //     filterConfig.time.from <= time ||
    //     (!filterConfig.time.from && time <= filterConfig.time.to) ||
    //     !filterConfig.time.to;
    //   let dateOk = filterConfig.days.length === 0;
    //   for (let day of filterConfig.days) {
    //     dateOk = trip.days.indexOf(day) !== -1 || dateOk;
    //   }
    //   console.log(" dateOk ", dateOk, " timeOk ", timeOk, " costOk ", costOk);
    //   if (dateOk && timeOk && costOk) {
    //     filter_results.push(trip);
    //   }
    // }
    // setFilteredList(filter_results);
  };

  // открытие окна добавления
  const addRouteHandler = () => {
    setAddRoute(true);
  };

  // открытие окна обновления
  const updateRouteHandler = (id) => {
    let route = null;
    for (let r of routes) {
      if (r.id === id) {
        route = r;
        break;
      }
    }
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
      {/* {addRoute && <AddTrip cancelHandler={cancelAddHandler} />}
      {updateRoute && (
        <UpdateTrip
          cancelHandler={cancelUpdateHandler}
          data={updateRouteById}
        />
      )}
      {deleteRoute && (
        <DeleteTrip cancelHandler={cancelDeleteHandler} id={deleteRouteById} />
      )} */}
    </div>
  );
};

export default RoutesPage;
