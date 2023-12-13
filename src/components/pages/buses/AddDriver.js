import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchBus } from "../../../store/requests/BusesRequests";

import AddObject from "../../cards/AddUpdateDeleteObjects";

import "../../cards/objectStyles/Window.css";
import "./busesStyles/AddUpdateBus.css";

const AddDriver = ({ cancelHandler, data }) => {
  const dispatch = useDispatch();

  const drivers = useSelector((state) => state.employees.drivers);

  useEffect(() => {
    if (data.drive_id) {
      document.getElementById("driver-select").value = JSON.stringify(
        drivers.find((driver) => driver.id === data.drive_id)
      );
    }
  }, []);

  //ВАЛИДАЦИЯ
  const [driverOk, setDriverOk] = useState(true);
  const [driverIsFree, setDriverIsFree] = useState(true);

  // валидация и отправка формы
  const confirmHandler = (event) => {
    event.preventDefault();

    let driver = JSON.parse(document.getElementById("driver-select").value);

    let driverOk = driver !== "Выбрать";
    let driverIsFree = driver.bus_id == null || driver.bus_id === data.id;

    setDriverOk(driverOk);
    setDriverIsFree(driverIsFree);

    // отправка запроса
    if (driverOk && driverIsFree) {
      dispatch(patchBus({ bus_id: data.id, driver_id: driver.id }));
      // закрытие окна
      cancelHandler();
    }
  };

  const secondConfirmHandler = (event) => {
    event.preventDefault();

    let driver = JSON.parse(document.getElementById("driver-select").value);
    dispatch(patchBus({ bus_id: data.id, driver_id: driver.id }));
    cancelHandler();
  };

  const errorMessage = () => {
    return "ошибка";
  };

  return (
    <AddObject
      cancelHandler={cancelHandler}
      submitHandler={driverIsFree ? confirmHandler : secondConfirmHandler}
      errorMessage={errorMessage}
      noErrors={true}
    >
      <>
        <label className="secondary-label">Назначить другого водителя</label>

        <select
          id="driver-select"
          defaultValue={JSON.stringify("Не назначен")}
          className={driverOk ? "base-border" : "error-border"}
        >
          <option disabled value={JSON.stringify("Не назначен")}>
            Не назначен
          </option>
          {drivers?.map((driver) => (
            <option key={driver.id} value={JSON.stringify(driver)}>
              {driver.last_name} {driver.first_name.slice(0, 1)}.{" "}
              {driver.father_name ? driver.father_name.slice(0, 1) + "." : ""}
            </option>
          ))}
          {drivers.length === 0 && (
            <option disabled>Нет подходящих водителей</option>
          )}
        </select>
        {!driverIsFree && (
          <p id="driver-busy-message">
            За водителем уже закреплен другой автобус. Назначить его на этот?
          </p>
        )}
      </>
    </AddObject>
  );
};

export default AddDriver;
