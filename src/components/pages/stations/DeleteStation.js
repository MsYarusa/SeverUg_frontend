import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStation } from "../../../store/requests/StationsRequests";

import DeleteObject from "../../cards/AddUpdateDeleteObjects";
import "../../cards/objectStyles/Window.css";

const DeleteStation = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();
  // получение данных из стора
  const routes = useSelector((state) => state.routes.routes);

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
          ? "Через станцию проложены маршруты. Они и назначенные на них рейсы будут удалены вместе со станцией"
          : "Подтвердите удаление станции"}
      </p>
    </DeleteObject>
  );
};

export default DeleteStation;
