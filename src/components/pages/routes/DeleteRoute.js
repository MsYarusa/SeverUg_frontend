import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoute } from "../../../store/requests/RoutesRequests";
import { removeTrip } from "../../../store/slicies/scheduleSlice";

import DeleteObject from "../../cards/AddUpdateDeleteObjects";

const DeleteRoute = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();
  // получение данных из стора
  const schedule = useSelector((state) => state.schedule.schedule);

  // флаг, показывающий наличие связанных рейсов
  const [routeIsUsed, setRouteIsUsed] = useState(false);

  // валидация (проверка на наличии связанных рейсов)
  const confirmHaldler = (event) => {
    event.preventDefault();
    let routeIsUsed = false;
    for (let trip of schedule) {
      if (trip.road.id === id) {
        routeIsUsed = true;
        break;
      }
    }

    if (!routeIsUsed) {
      // если связанных рейсов нет, то отправляем запрос
      dispatch(deleteRoute({ id: id }));
      cancelHandler();
    } else {
      // если связанные рейсы есть, то поднимаем флаг о их наличии
      setRouteIsUsed(true);
    }
  };

  // отправка запроса при подтверждении удаления связанных рейсов
  const secondConfirmHaldler = (event) => {
    event.preventDefault();
    // удаляем связанные рейсы локально
    for (let trip of schedule) {
      if (trip.road.id === id) {
        dispatch(removeTrip({ id: trip.id }));
      }
    }
    // отправляем запрос на удаление маршрута
    dispatch(deleteRoute({ id: id }));
    // закрытие окна
    cancelHandler();
  };

  return (
    <DeleteObject
      cancelHandler={cancelHandler}
      submitHandler={routeIsUsed ? secondConfirmHaldler : confirmHaldler}
      errorMessage={() => {}}
      noErrors={true}
    >
      <p>
        {routeIsUsed
          ? "Вместе с маршрутом будут удалены все назначеные на него рейсы"
          : "Подтвердите удаление маршрута"}
      </p>
    </DeleteObject>
  );
};

export default DeleteRoute;
