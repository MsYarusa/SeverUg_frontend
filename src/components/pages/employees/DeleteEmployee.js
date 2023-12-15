import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  deleteDriver,
} from "../../../store/requests/EmployeesRequests";

import DeleteObject from "../../cards/AddUpdateDeleteObjects";

import "../../cards/objectStyles/Window.css";

const DeleteEmployee = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule.schedule);

  const [driverIsUsed, setDriverIsUsed] = useState(false);

  // подтверждение удаления
  const confirmHaldler = (event) => {
    event.preventDefault();
    let driverIsUsed = false;
    for (let trip of schedule) {
      if (trip.driver.id === id) {
        driverIsUsed = true;
        break;
      }
    }
    if (!driverIsUsed) {
      // отправка запроса на удаление
      if (id < 0) {
        dispatch(deleteEmployee({ id: -id }));
      } else {
        dispatch(deleteDriver({ id: id }));
      }

      // закрытие окна
      cancelHandler();
    } else {
      setDriverIsUsed(driverIsUsed);
    }
  };

  const secondConfirmHaldler = (event) => {
    event.preventDefault();
    // отправка запроса на удаление
    if (id < 0) {
      dispatch(deleteEmployee({ id: -id }));
    } else {
      dispatch(deleteDriver({ id: id }));
    }
    // закрытие окна
    cancelHandler();
  };

  return (
    <DeleteObject
      cancelHandler={cancelHandler}
      submitHandler={driverIsUsed ? secondConfirmHaldler : confirmHaldler}
      errorMessage={() => {}}
      noErrors={true}
    >
      <p>
        {driverIsUsed
          ? "Рейсы на которые назначен водитель будут удалены вместе с ним"
          : "Подтвердите удаление данных сотрудника"}
      </p>
    </DeleteObject>
  );
};

export default DeleteEmployee;
