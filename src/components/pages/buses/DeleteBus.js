import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBus } from "../../../store/requests/BusesRequests";

import DeleteObject from "../../cards/AddUpdateDeleteObjects";

import "../../cards/objectStyles/Window.css";

const DeleteBus = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule.schedule);

  const [busIsUsed, setBusIsUsed] = useState(false);

  // подтверждение удаления
  const confirmHaldler = (event) => {
    event.preventDefault();
    let busIsUsed = false;
    for (let trip of schedule) {
      if (trip.bus.id === id) {
        busIsUsed = true;
        break;
      }
    }
    if (!busIsUsed) {
      // отправка запроса на удаление
      dispatch(deleteBus({ id: id }));
      // закрытие окна
      cancelHandler();
    } else {
      setBusIsUsed(busIsUsed);
    }
  };

  const secondConfirmHaldler = (event) => {
    event.preventDefault();

    // отправка запроса на удаление
    dispatch(deleteBus({ id: id }));
    // закрытие окна
    cancelHandler();
  };

  return (
    <DeleteObject
      cancelHandler={cancelHandler}
      submitHandler={busIsUsed ? secondConfirmHaldler : confirmHaldler}
      errorMessage={() => {}}
      noErrors={true}
    >
      <p>
        {busIsUsed
          ? "Автобус назначен на рейсы. Они будут удалены вместе с автобусом"
          : "Подтвердите удаление данных автобуса"}
      </p>
    </DeleteObject>
  );
};

export default DeleteBus;
