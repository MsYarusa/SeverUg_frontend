import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStation } from "../../../store/requests/StationsRequests";
import { removeRoute } from "../../../store/slicies/routesSlice";
import { removeTrip } from "../../../store/slicies/scheduleSlice";

import DeleteObject from "../../cards/AddUpdateDeleteObjects";
import "../../cards/objectStyles/Window.css";

const DeleteStation = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();
  // получение данных из стора
  const routes = useSelector((state) => state.routes.routes);
  const schedule = useSelector((state) => state.schedule.schedule);

  // флаг, показывающий наличие связанных рейсов и маршрутов
  const [stationIsUsed, setStationIsUsed] = useState(false);

  // валидация (проверка на наличии связанных рейсов и маршрутов)
  const confirmHaldler = (event) => {
    event.preventDefault();
    let stationIsUsed = false;
    for (let route of routes) {
      if (route.stations.find((station) => station.id === id)) {
        stationIsUsed = true;
        break;
      }
    }

    if (!stationIsUsed) {
      // если связанных рейсов и маршрутов нет, то отправляем запрос на удаление станции
      dispatch(deleteStation({ id: id }));
      cancelHandler();
    } else {
      // если связанные рейсы и машруты есть, то поднимаем флаг о их наличии
      setStationIsUsed(true);
    }
  };

  // отправка запроса при подтверждении удаления связанных рейсов и машрутов
  const secondConfirmHaldler = (event) => {
    event.preventDefault();
    // удаляем связанные маршруты локально
    for (let route of routes) {
      if (route.stations.find((station) => station.id === id)) {
        dispatch(removeRoute({ id: route.id }));
      }
    }
    // удаляем связанные рейсы локально
    for (let trip of schedule) {
      if (trip.road.stations.find((station) => station.id === id)) {
        dispatch(removeTrip({ id: trip.id }));
      }
    }
    // отправляем запрос на удаление станции
    dispatch(deleteStation({ id: id }));
    // закрытие окна
    cancelHandler();
  };

  return (
    <DeleteObject
      cancelHandler={cancelHandler}
      submitHandler={stationIsUsed ? secondConfirmHaldler : confirmHaldler}
      errorMessage={() => {}}
      noErrors={true}
    >
      <p>
        {stationIsUsed
          ? "Вместе со станцией буду удалены все связанные маршруты и рейсы"
          : "Подтвердите удаление станции"}
      </p>
    </DeleteObject>
  );
};

export default DeleteStation;
