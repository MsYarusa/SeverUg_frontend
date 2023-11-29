import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStation } from "../../../requests/StationsRequests";
import "../../cards/Window.css";

const DeleteStation = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.routes.routes);

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

  return (
    <div className="window__container">
      <div className="window">
        <p>Подтвердите удаление станции</p>
        <p className={stationIsUsed ? "error" : "error-disabled"}>
          Нельзя удалить станцию через которую существует маршрут
        </p>
        <div id="buttons">
          <button id="cancel" onClick={cancelHandler}>
            Отмена
          </button>
          <button id="confirmation" onClick={confirmHaldler}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStation;
