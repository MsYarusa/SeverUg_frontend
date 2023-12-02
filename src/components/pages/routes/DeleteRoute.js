import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoute } from "../../../requests/RoutesRequests";
import { removeTrip } from "../../../store/scheduleSlice";

import "../../cards/objectStyles/Window.css";

const DeleteRoute = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule.schedule);

  const [routeIsUsed, setRouteIsUsed] = useState(false);

  const confirmHaldler = () => {
    let routeIsUsed = false;
    for (let trip of schedule) {
      if ((trip.route.id = id)) {
        routeIsUsed = true;
        break;
      }
    }

    if (!routeIsUsed) {
      dispatch(deleteRoute({ id: id }));
      cancelHandler();
    } else {
      setRouteIsUsed(true);
    }
  };

  const secondConfirmHaldler = () => {
    for (let trip of schedule) {
      if ((trip.route.id = id)) {
        dispatch(removeTrip({ id: trip.id }));
      }
    }

    dispatch(deleteRoute({ id: id }));
    cancelHandler();
  };

  return (
    <div className="window__container">
      <div className="window">
        <p>
          {routeIsUsed
            ? "Вместе с маршрутом будут удалены \n все назначеные на него рейсы"
            : "Подтвердите удаление маршрута \n"}
        </p>
        <div id="buttons">
          <button id="cancel" onClick={cancelHandler}>
            Отмена
          </button>
          <button
            id="confirmation"
            onClick={routeIsUsed ? secondConfirmHaldler : confirmHaldler}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoute;
