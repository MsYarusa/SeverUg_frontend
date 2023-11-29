import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStations } from "../../../requests/StationsRequests";
import { getRoutes } from "../../../requests/RoutesRequests";

import StationsList from "./StationsList";
import AddStation from "./AddStation";
import UpdateStation from "./UpdateStation";
import DeleteStation from "./DeleteStation";

const StationsPage = () => {
  // запрашиваем данные из стора
  const stations = useSelector((state) => state.stations.stations);
  const routes = useSelector((state) => state.routes.routes);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (stations.length === 0) {
      dispatch(getStations());
    }
    if (routes.length === 0) {
      dispatch(getRoutes());
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
    let search_results = [];
    for (let station of stations) {
      if (station.name.toLowerCase().indexOf(searchConfig) === 0) {
        search_results.push(station);
      }
    }
    setSearchedList(search_results);
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
      {addStation && <AddStation cancelHandler={cancelAddHandler} />}
      {updateStation && (
        <UpdateStation
          cancelHandler={cancelUpdateHandler}
          data={updateStationById}
        />
      )}
      {deleteStation && (
        <DeleteStation
          cancelHandler={cancelDeleteHandler}
          id={deleteStationById}
        />
      )}
    </div>
  );
};

export default StationsPage;
