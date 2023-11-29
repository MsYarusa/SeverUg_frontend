import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStations } from "../../../requests/StationsRequests";

import StationsList from "./StationsList";

const StationsPage = () => {
  // запрашиваем данные из стора
  const stations = useSelector((state) => state.stations.stations);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (stations.length === 0) {
      dispatch(getStations());
    }
  }, []);

  // хранение отфильтрованного списка
  const [searchedList, setSearchedList] = useState(stations);

  useEffect(() => {
    setSearchedList(stations);
  }, [stations]);

  // хранение информации об окнах
  const [addStation, setAddStation] = useState(false);
  const [updateStation, setUpdateStation] = useState(false);
  const [deleteStation, setDeleteStation] = useState(false);
  const [deleteStationById, setDeleteStationById] = useState(-1);
  const [updateStationById, setUpdateStationById] = useState(null);

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

  // открытие окна добавления
  const addStationHandler = () => {
    setAddStation(true);
  };

  // открытие окна обновления
  const updateStationHandler = (id) => {
    let station = null;
    for (let r of stations) {
      if (r.id === id) {
        station = r;
        break;
      }
    }
    setUpdateStationById(station);
    setUpdateStation(true);
  };

  // открытие окна удаления
  const deleteStationHandler = (id) => {
    setDeleteStationById(id);
    setDeleteStation(true);
  };

  // закрытие окна добавления
  const cancelAddHandler = () => {
    setAddStation(false);
  };

  // закрытие окна обновления
  const cancelUpdateHandler = () => {
    setUpdateStation(false);
  };

  // закрытие окна удаления
  const cancelDeleteHandler = () => {
    setDeleteStation(false);
  };

  return (
    <div className="page">
      <StationsList
        searchHandler={searchHandler}
        buttonsHandlers={{
          add: addStationHandler,
          update: updateStationHandler,
          delete: deleteStationHandler,
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

export default StationsPage;
