import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putStation } from "../../../requests/StationsRequests";
import { updateRoute } from "../../../store/routesSlice";
import { updateTrip } from "../../../store/scheduleSlice";

import "../../cards/objectStyles/Window.css";
import "./stationStyles/AddUpdateStation.css";

const UpdateStation = ({ cancelHandler, data }) => {
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.routes.routes);
  const schedule = useSelector((state) => state.schedule.schedule);

  useEffect(() => {
    if (data) {
      document.getElementById("station-name").value = data.name;
    }
  }, [data]);

  // валидация
  const [nameOk, setNameOk] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    let name = document.getElementById("station-name").value;
    let nameOk = name !== "";
    setNameOk(nameOk);

    if (nameOk) {
      // локально изменяем станции в маршрутах, связанных с этой станцией
      for (let route of routes) {
        if (route.stations.find((station) => station.id === data.id)) {
          let newStations = [];
          route.stations.forEach((item, i, arr) => {
            let newStation = {
              id: item.id,
              name: item.name,
            };
            if (item.id === data.id) {
              newStation.name = name;
            }
            newStations.push(newStation);
          });

          const NewRoute = {
            id: route.id,
            price: route.price,
            time: route.time,
            stations: newStations,
            sort: route.sort,
          };
          dispatch(updateRoute({ id: route.id, route: NewRoute }));

          for (let trip of schedule) {
            if (trip.road.id === route.id) {
              let NewTrip = {
                id: trip.id,
                departure_time: trip.departure_time,
                days: trip.days,
                driver: trip.driver,
                road: NewRoute,
              };
              dispatch(updateTrip({ id: trip.id, trip: NewTrip }));
            }
          }
        }
      }
      // console.log({
      //   id: name.id,
      //   name: name,
      // });
      dispatch(
        putStation({
          id: data.id,
          name: name,
        })
      );
      cancelHandler();
    }
  };

  return (
    <div className="window__container">
      <form className="window" onSubmit={submitHandler}>
        <div className="window__inner">
          <label id="main">Изменение станции</label>
          <div className="station-input" key={"station-name__container"}>
            <label>Название станции:</label>
            <input
              type="text"
              id={"station-name"}
              className={nameOk ? "base-border" : "error-border"}
            />
          </div>
        </div>
        <div id="buttons">
          <button id="cancel" type="button" onClick={cancelHandler}>
            Отмена
          </button>
          <button type="submit">Подтвердить</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStation;
