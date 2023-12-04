import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStations } from "../../../store/requests/StationsRequests";
import { getRoutes } from "../../../store/requests/RoutesRequests";
import { getSchedule } from "../../../store/requests/ScheduleRequests";

import StationsList from "./StationsList";
import AddUpdateStation from "./AddUpdateStation";
import DeleteStation from "./DeleteStation";
import ObjectsPage from "../../cards/ObjectsPage";

const StationsPage = () => {
  // запрашиваем данные из стора
  const stations = useSelector((state) => state.stations.stations);
  const routes = useSelector((state) => state.routes.routes);
  const schedule = useSelector((state) => state.schedule.schedule);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (stations.length === 0) {
      dispatch(getStations());
    }
    if (routes.length === 0) {
      dispatch(getRoutes());
    }
    if (schedule.length === 0) {
      dispatch(getSchedule());
    }
  }, []);

  // хранение отфильтрованного списка
  const [searchedList, setSearchedList] = useState(stations);

  useEffect(() => {
    setSearchedList(stations);
  }, [stations]);

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

  return (
    <ObjectsPage
      AddUpdateObject={AddUpdateStation}
      DeleteObject={DeleteStation}
      ObjectFilter={null}
      ObjectsList={StationsList}
      filterHandler={null}
      searchHandler={searchHandler}
      list={searchedList}
      objects={stations}
    />
  );
};

export default StationsPage;
