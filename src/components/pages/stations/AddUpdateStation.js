import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putStation } from "../../../store/requests/StationsRequests";
import { postStation } from "../../../store/requests/StationsRequests";
import { updateStationInRoute } from "../../../store/slicies/routesSlice";
import { updateStationInTrip } from "../../../store/slicies/scheduleSlice";

import AddUpdateObject from "../../cards/AddUpdateDeleteObjects";

import "./stationStyles/AddUpdateStation.css";

const AddUpdateStation = ({ cancelHandler, data }) => {
  const dispatch = useDispatch();
  // получение данных из стора
  const stations = useSelector((state) => state.stations.stations);

  // УСТАНОВЛЕНИЕ НАЧАЛЬНЫХ ЗНАЧЕНИЙ (в случае их получения)
  useEffect(() => {
    if (data) {
      document.getElementById("station-name").value = data.name;
    }
  }, [data]);

  // ВАЛИДАЦИЯ
  //флаг успешной валидации
  const [nameOk, setNameOk] = useState(true);
  const [noRepeats, setNoRepeats] = useState(true);

  //валидация и отправка формы
  const submitHandler = (event) => {
    event.preventDefault();

    // получение значения инпута
    let name = document.getElementById("station-name").value;
    // проверка корректности полученного значения
    let nameOk = name !== "";
    let noRepeats = true;
    for (let station of stations) {
      if (station.name === name) {
        noRepeats = false || (data && data.id === station.id);
      }
    }
    // поднятие флага в случае корректности входных данных
    setNameOk(nameOk);
    setNoRepeats(noRepeats);

    // если данные корректны, то происходит отправка запроса
    if (nameOk && noRepeats) {
      if (data) {
        //если станция была указана, то данные станции обновляются
        // локально подтягиваем изменения в маршрутах и рейсах, связанных с этой станцией
        dispatch(updateStationInRoute({ id: data.id, name: name }));
        dispatch(updateStationInTrip({ id: data.id, name: name }));
        // отправка запроса
        dispatch(
          putStation({
            id: data.id,
            name: name,
          })
        );
      } else {
        // если станция не указана, то создается новая станция
        dispatch(
          postStation({
            name: name,
          })
        );
      }
      //закрытие окна
      cancelHandler();
    }
  };

  const errorMessage = () => {
    return "Имя станции должно быть уникальным";
  };

  return (
    <AddUpdateObject
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
      errorMessage={errorMessage}
      noErrors={noRepeats}
    >
      <label id="main">Изменение станции</label>
      <div className="station-input" key={"station-name__container"}>
        <label>Название станции:</label>
        <input
          type="text"
          id={"station-name"}
          className={nameOk && noRepeats ? "base-border" : "error-border"}
        />
      </div>
    </AddUpdateObject>
  );
};

export default AddUpdateStation;
