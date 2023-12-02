import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStation } from "../../../requests/StationsRequests";
import { removeRoute } from "../../../store/routesSlice";
import { removeTrip } from "../../../store/scheduleSlice";
import "../../cards/objectStyles/Window.css";

const DeleteStation = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.routes.routes);
  const schedule = useSelector((state) => state.schedule.schedule);

  const [stationIsUsed, setStationIsUsed] = useState(false);

  const confirmHaldler = () => {
    let stationIsUsed = false;
    for (let route of routes) {
      if (route.stations.find((station) => station.id === id)) {
        stationIsUsed = true;
        break;
      }
    }

    if (!stationIsUsed) {
      dispatch(deleteStation({ id: id }));
      cancelHandler();
    } else {
      setStationIsUsed(true);
    }
  };

  const secondConfirmHaldler = () => {
    for (let route of routes) {
      if (route.stations.find((station) => station.id === id)) {
        dispatch(removeRoute({ id: route.id }));
      }
    }

    for (let trip of schedule) {
      if (trip.road.stations.find((station) => station.id === id)) {
        dispatch(removeTrip({ id: trip.id }));
      }
    }

    dispatch(deleteStation({ id: id }));
    cancelHandler();
  };

  return (
    <div className="window__container">
      <div className="window">
        <p>
          {stationIsUsed
            ? "Вместе со станцией буду удалены \n все связанные маршруты и рейсы"
            : "Подтвердите удаление станции \n"}
        </p>
        <div id="buttons">
          <button id="cancel" onClick={cancelHandler}>
            Отмена
          </button>
          <button
            id="confirmation"
            onClick={stationIsUsed ? secondConfirmHaldler : confirmHaldler}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStation;
